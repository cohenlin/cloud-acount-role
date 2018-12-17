/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import { routerRedux } from 'dva/router';

export default {
  namespace: 'forgetPasswordResult',
  state: {
    count: 3,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/cloud/forgetPasswordResult') {
          let count = 3;
          const account = setInterval(() => {
            count -= 1;
            dispatch({
              type: 'updateState',
              payload: {
                count,
              },
            });
            if (count === 0) {
              clearInterval(account);
              dispatch({
                type: 'goMain',
              });
              dispatch({
                type: 'updateState',
                payload: {
                  count: 3,
                },
              });
            }
          }, 1000);
        }
      });
    },
  },
  effects: {
    * goMain(payload, { put }) {
      yield put(routerRedux.push('/system/cloud/home'));
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
