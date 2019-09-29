/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-09-04 08:45
 */

import { post } from './index';

// 新增指标接口 开始

/**
 * 新增指标
 * 指标进度
 * 获取 分公司
 * @param resolve
 */
export const getAddBoardFromDitchApi = (resolve) => {
  post('/businessAssessment/findNewIncrementalIndicatorProgressGroupByBranch', {}).then(res => resolve(res));
};

/**
 * 新增指标
 * 指标进度
 * 获取 网格
 * @param data
 * @param resolve
 */
export const getAddBoardFromStreetApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalIndicatorProgressGroupByGridding', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 指标进度
 * 获取 一线经理
 * @param data
 * @param resolve
 */
export const getAddBoardFromPersonApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalIndicatorProgressGroupByManager', data).then(res => resolve(res));
};


/**
 * 新增指标
 * 指标进度
 * 获取 渠道明细
 * @param data
 * @param resolve
 */
export const getAddBoardFromDitchlApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalIndicatorProgressGroupByTrenchName', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 指标进度
 * 时间进度
 * 获取 分公司
 * @param resolve
 */
export const getAddTimeFromDitchApi = (resolve) => {
  post('/businessAssessment/findNewIncrementalTimeProgressGroupByBranch', {}).then(res => resolve(res));
};

/**
 * 新增指标
 * 指标进度
 * 时间进度
 * 获取 网格
 * @param data
 * @param resolve
 */
export const getAddTimeFromStreetApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalTimeProgressGroupByGridding', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 指标进度
 * 时间进度
 * 获取 一线经理
 * @param data
 * @param resolve
 */
export const getAddTimeFromPersonApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalTimeProgressGroupByManager', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 渠道参与
 * 获取 分公司
 * @param resolve
 */
export const getAddPathFromCapacityDitchApi = (resolve) => {
  post('/businessAssessment/findTrenchParticipationGroupByBranch', {}).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 渠道参与
 * 获取 网格
 */
export const getAddPathFromCapacityStreetApi = (data, resolve) => {
  post('/businessAssessment/findTrenchParticipationGroupByGridding', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 渠道参与
 * 获取 一线经理
 * @param data
 * @param resolve
 */
export const getAddPathFromCapacityPersonApi = (data, resolve) => {
  post('/businessAssessment/findTrenchParticipationGroupByManager', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 渠道产能
 * 获取 组织架构
 */
export const getDitchOrganizationApi = (resolve) => {
  post('/businessAssessment/findTrenchCapacityStructure', {}).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 渠道产能
 * 获取 渠道产能列表
 */
export const getDitchCapacityApi = (data, resolve) => {
  post('/businessAssessment/findTrenchCapacity', data).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 新增质量
 * 获取 组织架构
 */
export const getAddQualityOrganizationApi = (resolve) => {
  post('/businessAssessment/findNewIncrementalQualityStructure', {}).then(res => resolve(res));
};

/**
 * 新增指标
 * 提升路径
 * 新增质量
 * 获取 新增质量
 */
export const getAddQualityApi = (data, resolve) => {
  post('/businessAssessment/findNewIncrementalQuality', data).then(res => resolve(res));
};

// 新增指标接口 结束



// 家宽指标接口  开始
/**
 * 家宽指标
 * 指标进度
 * 获取 分公司
 * @param resolve
 */
export const getHomeBoardFromDitchApi = (resolve) => {
  post('/businessAssessment/findHomeBroadbandIndicatorProgressGroupByBranch', {}).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 获取 网格
 * @param resolve
 */
export const getHomeBoardFromStreetApi = (data, resolve) => {
  post('/businessAssessment/findHomeBroadbandIndicatorProgressGroupByGridding', data).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 获取 一线经理
 * @param data
 * @param resolve
 */
export const getHomeBoardFromPersonApi = (data, resolve) => {
  post('/businessAssessment/findHomeBroadbandIndicatorProgressGroupByManager', data).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 获取 五级地址
 * @param data
 * @param resolve
 */
export const getHomeBoardFromAddressApi = (data, resolve) => {
  post('/businessAssessment/findHomeBroadbandIndicatorProgressGroupByFiveAddress', data).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 时间进度
 * 获取 分公司
 * @param resolve
 */
export const getHomeTimeFromDitchApi = (resolve) => {
  post('/businessAssessment/findHomeBroadbandTimeProgressGroupByBranch', {}).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 时间进度
 * 获取 网格
 * @param data
 * @param resolve
 */
export const getHomeTimeFromStreetApi = (data, resolve) => {
  post('/businessAssessment/findHomeBroadbandTimeProgressGroupByGridding', data).then(res => resolve(res));
};

/**
 * 家宽指标
 * 指标进度
 * 时间进度
 * 获取 一线经理
 * @param data
 * @param resolve
 */
export const getHomeTimeFromPersonApi = (data, resolve) => {
  post('/businessAssessment/findHomeBroadbandTimeProgressGroupByManager', data).then(res => resolve(res));
};

/**
 * 家宽指标
 * 提升路径
 * 时间进度
 * @param type
 * @param resolve
 */
export const getHomePathType = (type, data, resolve) => {
  switch(type) {
    case '0':
      post('/businessAssessment/findHomeBroadbandNetGrowth', data).then(res => resolve(res));
      break;
    case '1':
      post('/businessAssessment/findSocietyTrench', data).then(res => resolve(res));
      break;
    case '2':
      post('/businessAssessment/findOfflineAverageDaily', data).then(res => resolve(res));
      break;
    default:
      post('/businessAssessment/findHomeBroadbandNetGrowth', data).then(res => resolve(res));
      break;
  }
};

/**
 *
 */
export const getHomePathOrganizationApi = ( resolve) => {
  post('/businessAssessment/findHomeBroadbandStructure', {}).then(res => resolve(res));
};

// 家宽指标接口  结束
