/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import { parse } from 'qs';
// import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { register } from '../../services/system/register';
import { sendSmsVerificationCode } from '../../services/app';

export default {
  namespace: 'register',
  state: {
    loading: false,
    count: 0,
    prefix: '',
    phoneNumber: '',
    allowSubmit: false,
    modalVisible: false,
  },
  subscriptions: {
    // setup({ history }) {
    //   history.listen((location) => {
    //     if (location.pathname === '/system/cloud/register') {
    //    }
    //   });
    // },
  },
  effects: {
    * register({ payload }, { put, call }) {
      yield put({ type: 'showLoading' });
      const res = yield call(register, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        yield put(routerRedux.push('/system/cloud/registerResult'));
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
    showModal(state) {
      return { ...state, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};
