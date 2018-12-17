/**
 * Created by Wangtaidong on 2017/12/22.
 */
import request from '../../utils/request';

export async function inquire(params) { // 查询所有机构列表
  return request('/api/org/getOrg', {
    method: 'post',
    body: params,
  });
}

export async function inquireShop(params) { // 查询所有机构列表
  return request('/api/org/getShopByTenant', {
    method: 'post',
    body: params,
  });
}

export async function inquireStore(params) { // 编辑门店信息
  return request('/api/org/getStoreData', {
    method: 'post',
    body: params,
  });
}

export async function update(params) { // 编辑后保存门店信息
  return request('/api/org/updateStoreData', {
    method: 'post',
    body: params,
  });
}
