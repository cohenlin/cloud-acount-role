import request from '../../utils/request';

// 请求员工信息
export async function queryStaff(params) {
  return request('/api/user/queryUsers', {
    method: 'post',
    body: params,
  });
}
// 启用停用员工信息
export async function updateStatus(params) {
  return request('/api/user/changeStatus', {
    method: 'post',
    body: params,
  });
}
// 删除员工信息
export async function removeStaff(params) {
  return request('/api/user/deleteUser', {
    method: 'post',
    body: params,
  });
}

// 新增编辑
export async function createStaff(params) {
  return request('/api/user/saveUser', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 查看员工信息
export async function updateStaff(params) {
  return request('/api/user/queryUserById', {
    method: 'post',
    body: params,
  });
}
// 查看岗位
export async function queryPostList() {
  return request('/api/role/queryLowPost', {
    method: 'post',
  });
}
