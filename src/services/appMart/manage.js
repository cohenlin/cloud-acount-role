/**
 * Created by xiaochenghua on 2018/02/06.
 */
import request from '../../utils/request';

// 获取应用信息
export async function inquireApp(params) {
  return request('/api/application/selectAllApplicationList', {
    method: 'post',
    body: params,
  });
}// 获取门店信息 /api/application/getShopByAppId
export async function inquireShop(params) {
  return request('/api/org/getShopByApp', {
    method: 'post',
    body: params,
  });
}
// 上下架
export async function updateItemState(params) {
  return request('/api/application/handleAppOnShop', {
    method: 'post',
    body: params,
  });
}
