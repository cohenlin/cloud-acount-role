/**
 * Create by liukang on 2018/03/06
 * */
import request from '../../utils/request';
import { api } from '../../utils/config';

const path = api.payment.receiptShop;

// 获取列表
export async function inquire(params) {
  return request(`${path}/account/${params.accId}/stores`, {
    method: 'get',
    params,
  });
}

// 获取机构列表
export async function inquireStores() {
  return request('/api/org/getAll', {
    method: 'post',
  });
}

// 获取绑定列表
export async function inquireBinds() {
  return request(`${path}/stores`, {
    method: 'get',
  });
}

// 绑定
export async function bind(params) {
  return request(`${path}/account/${params.accId}/stores`, {
    method: 'post',
    body: JSON.stringify(params.shops),
  });
}

// 解绑
export async function unbind(params) {
  return request(`${path}/account/${params.accId}/store/${params.id}`, {
    method: 'delete',
  });
}

// 批量解绑
export async function unbindAll(params) {
  return request(`${path}/account/${params.accId}/stores`, {
    method: 'delete',
    body: JSON.stringify(params.shops),
  });
}
