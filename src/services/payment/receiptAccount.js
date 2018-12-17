/**
 * Create by liukang on 2018/03/06
 * */
import request from '../../utils/request';
import { api } from '../../utils/config';

const path = api.payment.receiptAccount;

// 获取列表
export async function inquire(params) {
  return request(`${path}/accounts`, {
    method: 'get',
    params,
  });
}

// 启用停用
export async function enable(params) {
  return request(`${path}/account/enable`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

// 添加
export async function create(params) {
  return request(`${path}/account`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 编辑
export async function update(params) {
  return request(`${path}/account`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

// 删除
export async function remove(params) {
  return request(`${path}/account/batch`, {
    method: 'delete',
    body: JSON.stringify(params),
  });
}

