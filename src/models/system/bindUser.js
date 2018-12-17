/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import { parse } from 'qs';
import { message } from 'antd';
import { toBindUser } from '../../services/system/register';
import { sendSmsVerificationCode } from '../../services/app';
import { getSession, toJson } from '../../utils/index';

export default {
  namespace: 'bindUser',
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
    * bind({ payload }, { put, call }) {
      yield put({ type: 'showLoading' });
      const { pk_group, accountname } = toJson(getSession('bindCheckParam'));
      const bindParam = { ...payload, pk_group, accountname };
      const res = yield call(toBindUser, parse(bindParam));
      const { code } = res.data;
      if (code === '200') {
        message.success('绑定成功');
        yield put({ type: 'hideLoading' });
        yield put({ type: 'bindCheck/login' });
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
