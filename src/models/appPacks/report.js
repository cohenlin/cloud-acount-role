/* CREATE BY YBY 2018/02/13 下午1:48:16*/
import config from '../../utils/config';

export default {
  namespace: 'report',
  state: {
    loading: false,
    urlDashboard: `${config.domainReport}dashboard`,
    urlGroupActivity: `${config.domainReport}groupActivity`,
    urlGroupIncome: `${config.domainReport}groupIncome`,
    urlDishesSold: `${config.domainReport}dishesSold`,
    urlRateDishes: `${config.domainReport}rateDishes`,

    urlStoreCashier: `${config.domainReport}storeCashier`,
    urlSiteSale: `${config.domainReport}siteSale`,
    urlGroupRecession: `${config.domainReport}groupRecession`,
    urlOperatingIncome: `${config.domainReport}operatingIncome`,
    urlRevenue: `${config.domainReport}revenue`,

    urlHourAnalysis: `${config.domainReport}hourAnalysis`,
    urlCashBenefit: `${config.domainReport}cashBenefit`,
    urlGroupBusiness: `${config.domainReport}groupBusiness`,
    urlTableStatistics: `${config.domainReport}tableStatistics`,
    urlPackageSales: `${config.domainReport}packageSales`,

    urlBillAnalysis: `${config.domainReport}billAnalysis`,
    urlAntiSettlement: `${config.domainReport}antiSettlement`,
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
