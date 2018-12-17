/* CREATE BY yunbaoyuan 2018/02/02 下午13:26:16*/
import request from '../../utils/request';

export async function inquire(params) {
  return request('/api/application/getApplicationById', {
    method: 'post',
    body: params,
  });
}
export async function create(params) {
  return request('/api/orderApplication/saveOrderApplication', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
