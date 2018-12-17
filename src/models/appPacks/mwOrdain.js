/* CREATE BY LMM 2018/04/03 上午午09:48:16*/
import config from '../../utils/config';

export default {
  namespace: 'mwOrdain',
  state: {
    loading: false,
    // 页面链接
    // 美味预定
    urlCurrent: `${config.domainMWCommon}booking/now`,
    urlHistory: `${config.domainMWCommon}booking/index`,
    urlAdvice: `${config.domainMWCommon}reservationcenter/index`,
    urlListImport: `${config.domainMWCommon}booking/import`,
    urlAddress: `${config.domainMWCommon}bookingaddress/index`,
    urlAddressImport: `${config.domainMWCommon}bookingaddress/import`,
    urlSite: `${config.domainMWCommon}minisite/index`,
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
