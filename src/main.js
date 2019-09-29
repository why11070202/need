/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-06-010 09:55
 */
import Vue from 'vue';
import App from './App';
import router from './Router';
import store from './store';
import { post } from './Fetch';
import { newpost } from './Fetch/api';
import { LoadingBar } from 'iview';
import Vant from 'vant';
import 'vant/lib/index.css';
import VCharts from 'v-charts';

LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 3
});

Vue.use(Vant);
Vue.use(VCharts);

Vue.config.productionTip = false;

Vue.prototype.$post = post;
Vue.prototype.$newpost = newpost;
Vue.prototype.pageSize = 50;

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  store.commit('setTitle', to.meta.title);
  next();
});
router.afterEach(route => {
  LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
