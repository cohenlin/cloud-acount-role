import { parse } from 'qs';
// import { message } from 'antd';
import { inquireBaseInfo, updateBaseInfo } from '../../services/system/personal';
import { getSession } from '../../utils/index';

export default {
  namespace: 'baseInfo',
  state: {
    id: '',
    userAccount: '',
    userName: '',
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // console.warn("location.pathname", location.pathname);
        if (location.pathname === '/system/personal/baseInfo') {
          // 取得是否登录变量
          const isLogin = getSession('isLogin');
          // 请求相关信息
          if (isLogin && isLogin === 'yes') {
            dispatch({
              type: 'queryBaseInfo',
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
    * queryBaseInfo({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireBaseInfo, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            userName: data.userName || '',
            userAccount: data.userAccount || '',
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * editBaseInfo({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { userAccount, userName } = yield select(state => state.baseInfo);
      const reqParams = {
        userAccount: payload.userAccount || userAccount,
        userName: payload.userName || userName,
      };
      const res = yield call(updateBaseInfo, parse(reqParams));
      const { code } = res.data;
      if (code === '200') {
        // message.success('资料更新成功');
        yield put({ type: 'querySuccess' });
        // 更新用户名成功后重新登录
        yield put({
          type: 'login/logoutSystem',
          payload: {
            logoutMsg: '资料更新成功,请重新登录！',
          },
        });
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
