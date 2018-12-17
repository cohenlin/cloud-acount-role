/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { checkBindUser } from '../../services/system/register';
import { entrySystemBind } from '../../services/system/login';
import { saveSession, getSession, toStr, toJson } from '../../utils/index';

export default {
  namespace: 'bindCheck',
  state: {
    loading: false,
    count: 0,
    prefix: '',
    phoneNumber: '',
    allowSubmit: false,
    modalVisible: false,
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        if (location.pathname === '/system/cloud/bindCheck') {
          console.warn('bindCheck', toStr(location.query));
          // 把相关参数保存到session中
          saveSession('bindCheckParam', toStr(location.query));
          // 请求后台校验端口
          dispatch({
            type: 'check',
            payload: location.query,
          });
        }
      });
    },
  },
  effects: {
    * check({ payload }, { put, call }) {
      console.warn('payload', payload);
      const res = yield call(checkBindUser, parse(payload));
      const { code } = res.data;
      // 如果绑定成功，调用绑定登录接口
      if (code === '200') {
        yield put({
          type: 'login',
        });
      } else if (code === '34') {
        yield put(routerRedux.push('/system/cloud/bindUser'));
      } else if (code === '1') {
        window.alert('数据异常！');
      }
    },
    * login({ payload }, { put, call }) {
      const { pk_group, accountname } = toJson(getSession('bindCheckParam'));
      const loginParam = { pk_group, accountname };
      const res = yield call(entrySystemBind, parse(loginParam));
      const { code, data } = res.data;
      // 如果登录成功
      if (code === '200') {
        saveSession('isLogin', 'yes');
        saveSession('username', data.userName || '');
        yield put({
          type: 'account/updateState',
          payload: {
            user: {
              username: data.userName || '',
            },
          },
        });
        yield put({
          type: 'account/queryContactList',
        });
      }
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
