import request from '../../utils/request';


// 获取商户详细信息
export async function inquireBusinessDetail(params) {
  return request('/api/tenant/getInformation ', {
    method: 'post',
    body: params,
  });
}


// 商户保存
export async function updateBusiness(params) {
  return request('/api/tenant/updateInformation ', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 上传图片

export async function uploadPic(params) {
  return request('/api/tenant/upload ', {
    method: 'post',
    body: params,
  });
}

// 修改商户资料 手机验证码
export async function sendSmsVerificationCode(params) {
  return request('/api/tenant/sendSmsVerificationCode', {
    method: 'post',
    body: params,
  });
}
