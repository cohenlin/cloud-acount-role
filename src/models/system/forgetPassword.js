/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import { parse } from 'qs';
// import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { forgetPassword } from '../../services/system/register';
import { sendSmsVerificationCode } from '../../services/app';

export default {
  namespace: 'forgetPassword',
  state: {
    loading: false,
    count: 0,
    prefix: '',
    phoneNumber: '',
    allowSubmit: false,
  },
  subscriptions: {},
  effects: {
    * forgetPassword({ payload }, { put, call }) {
      yield put({ type: 'showLoading' });
      const res = yield call(forgetPassword, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        yield put(routerRedux.push('/system/cloud/forgetPasswordResult'));
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取手机验证码
    * sendSmsVerificationCode({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield call(sendSmsVerificationCode, parse(payload));
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
