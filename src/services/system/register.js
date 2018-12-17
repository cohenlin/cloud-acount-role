/* CREATE BY ZC 2017/12/22 下午1:48:16*/
// 注册信息
import request from '../../utils/request';

export async function register(params) {
  return request('/api/account/register', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function forgetPassword(params) {
  return request('/api/account/forgetRestPassword', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 校验一键登录账户信息
export async function checkBindUser(params) {
  return request('/api/oneclick/checkUser', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 校验一键登录账户信息
export async function toBindUser(params) {
  return request('/api/oneclick/bindUser', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
