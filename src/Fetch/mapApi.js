/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-09-09 09:22
 */
import { post } from './index';


/**
 * 获取 同行号码 地图汇集
 * @param resolve
 */
export const getCtdByDriddingApi = (keyword, resolve) => {
  post('/ctd/findCtdSameTrade', {keyword}).then(res => resolve(res));
};

/**
 * 根据网格名称搜索客户及交易热力
 * @param resolve
 */
export const getCtdCustomerTradeApi = (keyword, resolve) => {
  post('/ctd/findCtdCustomerTrade', {keyword}).then(res => resolve(res));
};
