import request from '../../utils/request';


// 列表查询
export default function inquire(params) {
  return request('/api/application/getMyApps', {
    method: 'post',
    body: params,
  });
}
