import request from '../../utils/request';

// 请求角色信息
export async function queryPosts(params) {
  console.log(JSON.stringify(params));
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
// 新增角色
export async function savePost(params) {
  return request('/api/role/savePost', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 删除角色
export async function deletePost(params) {
  return request('/api/role/deletePost', {
    method: 'post',
    body: params,
  });
}
// 停用、启用角色
export async function changeStatus(params) {
  return request('/api/role/changeStatus', {
    method: 'post',
    body: params,
  });
}
