/* CREATE BY ZC 2018/1/5 */
import { parse } from 'qs';
// import { message } from 'antd';
// import { routerRedux } from 'dva/router';
import { inquireContactList, setCurrentTenant } from '../../services/system/personal';
import { getSession } from '../../utils/index';

export default {
  namespace: 'myBusiness',
  state: {
    contactList: [],
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/personal/myBusiness') {
          // 取得是否登录变量
          const isLogin = getSession('isLogin');
          // 请求相关信息
          if (isLogin && isLogin === 'yes') {
            dispatch({
              type: 'queryContactList',
            });
            dispatch({ // 设置是否是个人中心，用来控制左侧菜单
              type: 'account/updateState',
              payload: {
                isPersonal: true,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryContactList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireContactList, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            contactList: data || [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * setCurrentTenant({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(setCurrentTenant, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            contactList: [],
          },
        });
        yield put({ // 设置是否是个人中心，用来控制左侧菜单
          type: 'account/updateState',
          payload: {
            isPersonal: false,
          },
        });
        // 请求菜单按钮相关信息
        yield put({
          type: 'account/getMenu',
        });
        // yield put(routerRedux.push('/system/set/businessInfo'));
        // window.location = `index.html#/businessInfo`;
      }
      yield put({ type: 'hideLoading' });
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
