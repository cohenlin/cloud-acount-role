import request from '../../utils/request';

export function entrySystem(params) {
  return request('/auth/login', {
    method: 'post',
    body: params,
  });
}
// 绑定账户登录
export function entrySystemBind(params) {
  return request('/api/oneclick/oneClickLogin', {
    method: 'post',
    body: params,
  });
}
// 各系统登出操作
// 主系统
export function quitSystem() {
  return request('/auth/logout', {
    method: 'post',
  });
}
// demo系统
export function quitDemo() {
  return request('outApi/demo/logout', {
    method: 'post',
  });
}

// 外卖系统
export function quitTakeout() {
  return request('outApi/takeout/logout', {
    method: 'post',
  });
}
