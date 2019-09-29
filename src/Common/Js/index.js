/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-07-03 15:20
 */

/**
 * 获取地址栏参数
 */
export function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return decodeURI(r[2]);
  }
  return null;
}

/**
 * 金额 数据 格式化  带，号的
 * source 金额
 */
export function numberComma(source, length = 3) {
  source = parseInt(source);
  source = source.toFixed(3);
  source = String(source).split('.');
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
  let str = source.join('.');
  if (str === '0.000') {
    return '-';
  }
  return str;
}

/**
 * UUID生成器
 * @param len 长度 number
 * @param radix 随机数基数 number
 * @returns { string }
 */
export const uuid = (len, radix = 62) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[Math.floor(Math.random() * radix)]
    }
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = Math.floor(Math.random() * 16);
        uuid[i] = chars[(i === 19) ? ((r % 4) % 8) + 8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * 时间戳转时间
 */
export function formatDate(val, bool) {
  if (!val) {
    return null
  }
  let date = new Date(parseInt(val));
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  let strReA = Y + M + D + ' ' + h + m + s;
  let strReT = Y + M + D;
  if (bool) {
    return strReA
  } else {
    return strReT
  }
}
