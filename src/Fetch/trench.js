/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-09-09 11:19
 */
import { post } from './index';

/**
 * 渠道转型跟踪分析
 * 查询月份列表
 * @param resolve
 */
export const findMonthApi = (resolve) => {
  post('/trenchTransition/findMonth', {}).then(res => resolve(res));
};


/**
 * 渠道转型跟踪分析
 * 根据时间查询列表数据
 * @param resolve
 */
export const getListApi = (data, resolve) => {
  post('/trenchTransition/findTrenchTransition', data).then(res => resolve(res));
};
