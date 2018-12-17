/* CREATE BY YBY 2018/02/13 下午1:48:16*/
import config from '../../utils/config';

export default {
  namespace: 'takeout',
  state: {
    loading: false,
    urlBaseSet: `${config.domainTakeout}baseSet`,
    urlShopSet: `${config.domainTakeout}shopSet`,
    urlOrder: `${config.domainTakeout}order`,
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        switch (location.pathname) {
          case 'market': {
            console.warn('当前页面是应用市场');
            // 执行语句
            break;
          }
          default: {
            // 执行语句
            break;
          }
        }
      });
    },
  },
  effects: {
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
