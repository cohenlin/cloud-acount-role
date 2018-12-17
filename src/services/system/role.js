import request from '../../utils/request';

// 请求角色信息
export async function queryPosts(params) {
  return request('/api/role/queryPosts', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 根据id请求角色信息
export async function queryPostById(params) {
  return request('/api/role/queryPostByIds', {
    method: 'post',
    body: params,
  });
}
// 查询权限列表
export async function queryRoles(params) {
  return request('/api/role/queryRoles', {
    method: 'post',
    body: params,
  });
}
