/**
 * Created by Wangtaidong on 2017/12/29.
 */

import { parse } from 'qs';
// import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { entrySystem } from '../../services/system/login';
import { saveSession } from '../../utils/index';

export default {
  namespace: 'home',
  state: {
    loading: false,
    params: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/cloud/home') {
          // 判断如果有window.parent，说明是嵌套在iframe中的，也就是第三方来的，此时需要跳转到主页
          if (window.parent) {
            window.parent.location = window.location.href;
          }
          dispatch({
            type: 'updateState',
            params: parse(location.query),
          });

          window.login = (data) => {
            dispatch({
              type: 'login',
              payload: {
                ...data,
              },
            });
          };
          window.toRegister = () => {
            dispatch(routerRedux.push('/system/cloud/register'));
          };
          window.toForget = () => {
            dispatch(routerRedux.push('/system/cloud/forgetPassword'));
          };
        }
      });
    },
  },
  effects: {
    * login({ payload }, { put, call, select }) {
      const params = yield select(state => state.home.params);
      const res = yield call(entrySystem, { ...parse(payload), ...params });
      const { data, code } = res.data;
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
        // 请求菜单按钮相关信息
        // yield put({
        //   type: 'account/getMenu',
        // });
        // 跳转至基础资料
        // yield put(routerRedux.push('/system/personal/baseInfo'));
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
    updateState(state, payload) {
      return { ...state, ...payload };
    },
  },
};

