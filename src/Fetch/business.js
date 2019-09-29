/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-09-11 11:35
 */

import { post } from './index';

/**
 * 搜索 营装维进度
 */
export const searchBusinessApi = (data, resolve) => {
  post('/serveOpen/searchCommunity', data).then(res => resolve(res));
};

/**
 * 查询 营装维进度详情
 */
export const searchBusinessDetailApi = (id, resolve) => {
  post('/serveOpen/searchCommunityDetail', {
    id
  }).then(res => resolve(res));
};

/**
 * 查询 五级地址
 */
export const searchAddressByNameApi = (data, resolve) => {
  post('/serveOpen/searchFiveAddress', data).then(res => resolve(res));
};

/**
 * 社区查询
 */
export const searchStandardAddressByNameApi = (data, resolve) => {
  post('/serveOpen/searchCommunity', data).then(res => resolve(res));
};

/**
 * 根据五级地址 获取报表统计
 */
export const getListByAddressApi = (address, resolve) => {
  post('/serveOpen/statisticsByFiveAddress', {address}).then(res => resolve(res));
};

/**
 * 查询 报表统计 list
 */
export const getReportListApi = (data, resolve) => {
  post('/serveOpen/statisticServeopen', data).then(res => resolve(res));
};

/**
 * 查询 报表状态信息
 */
// export const getReportOrderStatusApi = (data, resolve) => {
//   post('/serveOpen/findChargeBacksByOrderStatus', data).then(res => resolve(res));
// };

/**
 * 根据 五级地址 获取报表信息
 */
export const getReportWorkOrderStatusApi = (data, resolve) => {
  post('/serveOpen/findOrderByCustomerTypeAndWorkOrderStatusAndCommunityName', data).then(res => resolve(res));
};

