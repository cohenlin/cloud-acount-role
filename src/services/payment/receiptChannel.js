/**
 * Create by liukang on 2018/03/06
 * */
import request from '../../utils/request';
import { api } from '../../utils/config';

const path = api.payment.receiptChannel;

// 获取列表
export async function inquire(params) {
  return request(`${path}/account/${params.accId}/channels`, {
    method: 'get',
    params,
  });
}

// 编辑
export async function update(params) {
  return request(`${path}/channel`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

// 编辑开通渠道
export async function updateChannel(params) {
  return request(`${path}/account/${params.accId}/channels`, {
    method: 'post',
    body: JSON.stringify(params.ids),
  });
}

// 获取渠道
export async function inquireChannel() {
  return request(`${path}/channel/setting/available`, {
    method: 'get',
  });
}

// 获取配置信息
export async function inquireConfigure(params) {
  return request(`${path}/channel/${params.id}`, {
    method: 'get',
  });
}
