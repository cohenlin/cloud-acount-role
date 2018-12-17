import request from '../../utils/request';

export function entrySystem(params) {
  return request('/auth/login', {
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

// 美味接入
export function inquireAppAuth() {
  return request('/api/authservice/inner/getThirdPartyAuth', {
    method: 'post',
  });
}

export function inquireMWTenant() {
  return request('/api/meiwei/getMeiweiPidBySessionId', {
    method: 'post',
  });
}
