/**
 * Create by liukang on 2018/03/06
 * */
import request from '../../utils/request';
import { api } from '../../utils/config';

const path = api.payment.bindAccount;

// 获取列表
export async function inquire(params) {
  return request(`${path}/store/accounts/available`, {
    method: 'get',
    params,
  });
}

// 获取当前绑定账户
export async function inquireAccount(params) {
  return request(`${path}/store/${params.bohCode}/account`, {
    method: 'get',
  });
}

// 编辑
export async function bind(params) {
  return request(`${path}/account/${params.accId}/bindstore`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}
