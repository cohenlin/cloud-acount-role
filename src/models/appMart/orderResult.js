/* CREATE BY lumingming 2018/02/08 下午16:31:16*/
// import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'orderResult',
  state: {
    payType: 'pay',
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        const pathname = location.pathname;
        const nowPath = pathname.split('/');
        const match = nowPath[nowPath.length - 1];
        if (match) {
          dispatch({
            type: 'updateState',
            payload: { payType: match },
          });
        }
      });
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

