import request from '../../utils/request';

export async function inquireBaseInfo(params) {
  return request('/api/account/getInformation', {
    method: 'post',
    body: params,
  });
}

export async function updateBaseInfo(params) {
  return request('/api/account/updateInformation', {
    method: 'post',
    body: JSON.stringify(params),
  });
}


// 查询商户切换
export async function inquireContactList() {
  return request('/api/tenant/list', {
    method: 'post',
  });
}

export async function updatePassword(params) {
  return request('/api/account/resetPassword', {
    method: 'post',
    body: params,
  });
}

// 切换商户
export async function setCurrentTenant(params) {
  return request('/api/account/setCurrentTenant ', {
    method: 'post',
    body: params,
  });
}
