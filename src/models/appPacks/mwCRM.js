/* CREATE BY YBY 2018/02/13 下午1:48:16*/
import config from '../../utils/config';

export default {
  namespace: 'mwCRM',
  state: {
    loading: false,
    // 页面链接
    // 会员管理
    urlManageList: `${config.domainMWCrm}memberlist/index`,
    urlManageGroup: `${config.domainMWCrm}marketgroup/index`,
    urlManageBlack: `${config.domainMWCrm}memberblack/index`,
    urlManageLevel: `${config.domainMWCrm}memberlevel/index`,
    urlManagePrContent: `${config.domainMWCrm}contentsetting/index`,
    urlManagePrValid: `${config.domainMWCrm}validrecord/index`,
    urlManagePrDistribute: `${config.domainMWCrm}delegate/index`,
    urlManageManual: `${config.domainMWCrm}memberlist/manualist`,
    // 支付宝口碑
    urlAlipayCard: `${config.domainMWCrm}business/alipayMember/memberCard?activeSupMenuId=144&activeSubMenuId=145`,
    // 实体卡
    urlCardDetail: `${config.domainMWCrm}entitycard/index`,
    urlCardPrepay: `${config.domainMWCrm}entitycard/prepaycharge`,
    // 营销管理
    urlMarketGame: `${config.domainMWCrm}shopmarket/index`,
    urlMarketActivity: `${config.domainMWCrm}marketactivity/index`,
    urlMarketEvaluate: `${config.domainMWCrm}commentactivity/index`,
    urlMarketPlugin: `${config.domainMWCrm}marketplugin/index`,
    urlMarketFission: `${config.domainMWCrm}bmanage/crm/marketing/fission-marketing`,
    urlMarketCode: `${config.domainMWCrm}business/qrCode/list?activeSupMenuId=121&activeSubMenuId=151`,
    urlMarketGive: `${config.domainMWCrm}business/consumptionActivity/list?activeSupMenuId=121&activeSubMenuId=157`,
    urlMarketReduce: `${config.domainMWCommon}bmanage/crm/marketing/activity-list`,
    // 优惠共享规则
    urlReduceRule: `${config.domainMWCrm}saleshare/index`,
    // 商家微信
    urlWxAuth: `${config.domainMWCrm}wxauthorizedlogin/index`,
    urlWxMenu: `${config.domainMWCrm}wxmanagemenu/index`,
    urlWxCard: `${config.domainMWCrm}wxcardset/detail`,
    urlWxReply: `${config.domainMWCrm}clientmessage/index`,
    urlWxSend: `${config.domainMWCrm}wxmarket/index`,
    urlWxMart: `${config.domainMWCrm}minishop/index`,
    urlWxMaterial: `${config.domainMWCrm}wxmaterial/index`,
    urlWxTemplate: `${config.domainMWCrm}wxtemplate/index`,
    urlWxShop: `${config.domainMWCrm}wxtemplate/htmlshop`,
    // 优惠券管理
    urlCouponList: `${config.domainMWCrm}business/coupon/list?activeSupMenuId=114&activeSubMenuId=115`,
    urlCouponCheck: `${config.domainMWCrm}coupon/check`,
    urlCouponShare: `${config.domainMWCommon}bmanage/crm/voucher/common-rule`,
    urlCouponDish: `${config.domainMWCommon}bmanage/crm/voucher/voucher-dish`,
    urlCouponGift: `${config.domainMWCrm}business/giftCoupon/list?activeSupMenuId=114&activeSubMenuId=158`,
    urlCouponCard: `${config.domainMWCrm}business/giftCouponOrder/list?activeSupMenuId=114&activeSubMenuId=159`,
    urlCouponCancel: `${config.domainMWCrm}business/giftCouponRecord/list?activeSupMenuId=114&activeSubMenuId=160`,
    urlCouponShelf: `${config.domainMWCrm}business/cardCoupon/list?activeSupMenuId=114&activeSubMenuId=161`,
    // 积分储值score
    urlScoreMart: `${config.domainMWCrm}scoreshop/index`,
    urlScoreOrder: `${config.domainMWCrm}scoreshop/orderlist`,
    urlScoreRule: `${config.domainMWCrm}scorestore/score`,
    urlScoreStore: `${config.domainMWCommon}bmanage/crm/score/charge-rule`,
    urlScoreRecord: `${config.domainMWCrm}scorehistory/index`,
    urlScoreStoreRecord: `${config.domainMWCrm}transhistory/index`,
    urlScoreTransition: `${config.domainMWCommon}storetransition/index.html?mtopid=Qi57vk56GDSJCc9czGiLYA-Z-Z`,
    urlScoreStoreReport: `${config.domainMWCommon}storesummary/index.html?mtopid=MR8lgistk2HiXdZaX9vJZg-Z-Z`,
    urlScoreReport: `${config.domainMWCommon}integralsummary/index.html?mtopid=iL4tEKqHbnVhVSpM4SfYSw-Z-Z`,
    urlScoreRefund: `${config.domainMWCommon}depositrefund/index.html?mtopid=xIsY-BbbPq0y3GlRTqtrnlDg-Z-Z`,
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
