/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-06-12 15:16
 */
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import store from '../store';
// import Vue from 'vue';

// const BASEURL = '/qianyin/tg/';
const BASEURL = 'http://192.168.0.98:7071/qianyin/tg/';
function startLoading() {
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '加载中...'
  });
  store.commit('setLoading', true);
}

function endLoading() {
  Toast.clear();
  store.commit('setLoading', false);
}

let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

axios.interceptors.request.use(config => {
  config.data = qs.parse(config.data);
  showFullScreenLoading();
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  tryHideFullScreenLoading();
  return response
}, error => {
  return Promise.resolve(error.response)
});

function checkStatus (response) {
  return response && (response.status === 200 || response.status === 304 || response.status === 400)
}

export const newpost = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      baseURL: BASEURL,
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
      },
      timeout: 50000,
      withCredentials: true
    }).then(res => {
      if (checkStatus(res)) {
        if (res.data.code === 100 || res.data.code === 200) {
          resolve(res.data)
        }else {
          Toast(res.data.message);
        }
        endLoading();
      } else {
        endLoading();
        reject(res);
      }
    }).catch(e => {
      endLoading();
      reject(e);
    })
  })
};
