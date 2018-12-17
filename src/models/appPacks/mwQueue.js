/* CREATE BY YBY 2018/02/13 下午1:48:16*/
import config from '../../utils/config';

export default {
  namespace: 'mwQueue',
  state: {
    loading: false,
    // 页面链接
    // 美味排队
    urlHistory: `${config.domainMWCommon}queuing/index`,
    urlSet: `${config.domainMWCommon}queueconfig/index`,
    urlList: `${config.domainMWCommon}queues/index`,
    urlAdd: `${config.domainMWCommon}queues/add`,
    urlAdList: `${config.domainMWCommon}shopdefine/index`,
    urlAdAdd: `${config.domainMWCommon}shopdefine/add`,
    urlReduceDetail: `${config.domainMWCommon}shopdiscount/index`,
    urlReduceAdd: `${config.domainMWCommon}shopdiscount/addnew`,
    urlOrderQueue: `${config.domainMWCommon}queuedetail/index`,
    urlOrderAppoint: `${config.domainMWCommon}quickdetail/index`,
  },
  subscriptions: {
    setup() {
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
