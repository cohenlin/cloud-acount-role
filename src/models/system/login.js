import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { quitSystem, quitDemo, quitTakeout } from '../../services/system/login';
import { delSession } from '../../utils/index';
// import {saveSession, toStr} from "../../utils";

export default {
  namespace: 'login',
  state: {
    loading: false,
    name: 'jack',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/login') {
          dispatch({
            type: 'login',
          });
        }
      });
    },
  },
  effects: {
    * logoutSystem({ payload }, { put, call, select }) {
      const menuCache = yield select(state => state.account.menu);
      const visitCache = yield select(state => state.account.permissions.visit);
      const res = yield call(quitSystem);
      const { code } = res.data;
      if (code === '200') {
        message.success(payload.logoutMsg || '退出成功！');
        // 删除相关缓存
        delSession('isLogin');
        delSession('cloudMenuTree');
        yield put(routerRedux.push('/system/cloud/home'));
        yield put({
          type: 'account/updateState',
          payload: {
            firstMenu: {},
            menu: { ...menuCache },
            permissions: {
              visit: { ...visitCache },
            },
            buttonPermissions: {},
          },
        });
      }
    },
    * logoutAppPacks(payload, { put }) {
      // demo系统
      // yield put({ type: 'logoutDemo' });
      // 外卖系统
      yield put({ type: 'logoutTakeout' });
    },
    * logoutDemo(payload, { call }) {
      const res = yield call(quitDemo);
      const { code } = res.data;
      if (code === '200') {
        // message.success('demo退出成功！');
      } else {
        // message.error('demo退出失败！');
      }
    },
    * logoutTakeout(payload, { call }) {
      const res = yield call(quitTakeout);
      const { code } = res.data;
      if (code === '200') {
        // message.success('demo退出成功！');
      } else {
        // message.error('demo退出失败！');
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
  },
};
