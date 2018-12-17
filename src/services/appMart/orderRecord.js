/**
 * Created by Wangtaidong on 2018/2/8.
 */
import request from '../../utils/request';

// 请求订单列表
export async function inquire(params) {
  return request('/api/orderApplication/getOrderApplications', {
    method: 'post',
    body: params,
  });
}

// 查询所有服务
export async function inquireApps(params) {
  return request('/api/orderApplication/getApplicationInOrder', {
    method: 'post',
    body: params,
  });
}

// 请求门店列表
export async function inquireShops(params) {
  return request('/api/orderApplication/getOrderStores', {
    method: 'post',
    body: params,
  });
}

// 取消订单
export async function abolish(params) {
  return request('/api/orderApplication/cancelOrderApplication', {
    method: 'post',
    body: params,
  });
}
