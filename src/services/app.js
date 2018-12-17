import request from '../utils/request';

// 请求机构信息
export async function queryOrg(params) {
  return request('/api/org/getAll', {
    method: 'post',
    body: params,
  });
}
export async function inquireProvinceList() {
  return request('/api/areas/getProvinceList', {
    method: 'post',
  });
}
export async function inquireAreaListByParentId(params) {
  return request('/api/areas/getAreaListByParentId', {
    method: 'post',
    body: params,
  });
}
// 请求左侧树
export async function getMenuTree(params) {
  return request('/api/menu/getMenuTree', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 注册和忘记密码 手机验证码
export async function sendSmsVerificationCode(params) {
  return request('/api/account/sendSmsVerificationCode', {
    method: 'post',
    body: params,
  });
}

// 获取门店信息
export function inquireShop(params) {
  return request('/api/org/getOrderShop', {
    method: 'post',
    body: params,
  });
}
