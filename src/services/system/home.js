/**
 * Created by Wangtaidong on 2017/12/29.
 */
import request from '../../utils/request';

export default function loginSystem(params) {
  return request('/auth/login', {
    method: 'post',
    body: params,
  });
}
