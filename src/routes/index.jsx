/**
 * Created by yunbaoyuan on 2017/9/4.
 */
import React, { PropTypes } from 'react';
import RouterConfig from '../router';
// 系统路由
import Home from './system/Home';
import Login from './system/Login';
import Password from './system/Password';
import BaseInfo from './system/BaseInfo';
import BusinessInfo from './system/BusinessInfo';
import MyBusiness from './system/MyBusiness';
import Registers from './system/Register';
import BindCheck from './system/BindCheck';
import BindUser from './system/BindUser';
import RegisterResult from './system/RegisterResult';
import ForgetPasswordResult from './system/ForgetPasswordResult';
import ForgetPassword from './system/ForgetPassword';
import Staff from './system/Staff';
import Role from './system/Role';
import Organization from './system/Organization';
import ReceiptAccount from './payment/ReceiptAccount';
import ReceiptChannel from './payment/ReceiptChannel';
import ReceiptShop from './payment/ReceiptShop';
// 应用系统
import Market from './appMart/Market';
import MyApp from './appMart/MyApp';
import Order from './appMart/Order';
import OrderResult from './appMart/OrderResult';
import Manage from './appMart/Manage';
import OrderRecord from './appMart/OrderRecord';

// 第三方应用-demo
import Member from './appPacks/demo/Member';

// 第三方应用-报表
import Dashboard from './appPacks/report/Dashboard';
import GroupActivity from './appPacks/report/GroupActivity';
import GroupIncome from './appPacks/report/GroupIncome';
import DishesSold from './appPacks/report/DishesSold';
import RateDishes from './appPacks/report/RateDishes';

import StoreCashier from './appPacks/report/StoreCashier';
import SiteSale from './appPacks/report/SiteSale';
import GroupRecession from './appPacks/report/GroupRecession';
import OperatingIncome from './appPacks/report/OperatingIncome';
import Revenue from './appPacks/report/Revenue';

import HourAnalysis from './appPacks/report/HourAnalysis';
import CashBenefit from './appPacks/report/CashBenefit';
import GroupBusiness from './appPacks/report/GroupBusiness';
import TableStatistics from './appPacks/report/TableStatistics';
import PackageSales from './appPacks/report/PackageSales';

import BillAnalysis from './appPacks/report/BillAnalysis';
import AntiSettlement from './appPacks/report/AntiSettlement';

// 外卖系统
import TakeOutBaseSet from './appPacks/takeout/BaseSet';
import TakeOutShopSet from './appPacks/takeout/ShopSet';
import TakeOutOrder from './appPacks/takeout/Order';

// 美味会员
import ManageList from './appPacks/mwCRM/ManageList';
import ManageGroup from './appPacks/mwCRM/ManageGroup';
import ManageBlack from './appPacks/mwCRM/ManageBlack';
import ManageLevel from './appPacks/mwCRM/ManageLevel';
import ManagePrContent from './appPacks/mwCRM/ManagePrContent';
import ManagePrValid from './appPacks/mwCRM/ManagePrValid';
import ManagePrDistribute from './appPacks/mwCRM/ManagePrDistribute';
import ManageManual from './appPacks/mwCRM/ManageManual';
// 支付宝口碑
import AlipayCard from './appPacks/mwCRM/AlipayCard';
 // 营销管理
import MarketActivity from './appPacks/mwCRM/MarketActivity';
import MarketGame from './appPacks/mwCRM/MarketGame';
import MarketEvaluate from './appPacks/mwCRM/MarketEvaluate';
import MarketPlugin from './appPacks/mwCRM/MarketPlugin';
import MarketFission from './appPacks/mwCRM/MarketFission';
import MarketCode from './appPacks/mwCRM/MarketCode';
import MarketGive from './appPacks/mwCRM/MarketGive';
// 商家微信
import WxAuth from './appPacks/mwCRM/WxAuth';
import WxMenu from './appPacks/mwCRM/WxMenu';
import WxCard from './appPacks/mwCRM/WxCard';
import WxReply from './appPacks/mwCRM/WxReply';
import WxSend from './appPacks/mwCRM/WxSend';
import WxMart from './appPacks/mwCRM/WxMart';
import WxMaterial from './appPacks/mwCRM/WxMaterial';
import WxTemplate from './appPacks/mwCRM/WxTemplate';
import WxShop from './appPacks/mwCRM/WxShop';
// 优惠共享规则
import ReduceRule from './appPacks/mwCRM/ReduceRule';
// 实体卡
import CardDetail from './appPacks/mwCRM/CardDetail';
import CardPrepay from './appPacks/mwCRM/CardPrepay';
// 美味预定
import Current from './appPacks/mwOrdain/Current';
import History from './appPacks/mwOrdain/History';
import Advice from './appPacks/mwOrdain/Advice';
import ListImport from './appPacks/mwOrdain/ListImport';
import Address from './appPacks/mwOrdain/Address';
import AddressImport from './appPacks/mwOrdain/AddressImport';
import Site from './appPacks/mwOrdain/Site';

// 优惠券管理
import CouponList from './appPacks/mwCRM/CouponList';
import CouponCheck from './appPacks/mwCRM/CouponCheck';
import CouponShare from './appPacks/mwCRM/CouponShare';
import CouponDish from './appPacks/mwCRM/CouponDish';
import CouponGift from './appPacks/mwCRM/CouponGift';
import CouponCard from './appPacks/mwCRM/CouponCard';
import CouponCancel from './appPacks/mwCRM/CouponCancel';
import CouponShelf from './appPacks/mwCRM/CouponShelf';
// 积分储值score
import ScoreMart from './appPacks/mwCRM/ScoreMart';
import ScoreOrder from './appPacks/mwCRM/ScoreOrder';
import ScoreRule from './appPacks/mwCRM/ScoreRule';
import ScoreStore from './appPacks/mwCRM/ScoreStore';
import ScoreRecord from './appPacks/mwCRM/ScoreRecord';
import StoreRecord from './appPacks/mwCRM/StoreRecord';
import ScoreTransition from './appPacks/mwCRM/ScoreTransition';
import ScoreStoreReport from './appPacks/mwCRM/ScoreStoreReport';
import ScoreReport from './appPacks/mwCRM/ScoreReport';
import ScoreRefund from './appPacks/mwCRM/ScoreRefund';
import MarketReduce from './appPacks/mwCRM/MarketReduce';
// 美味排队
import HistoryQueue from './appPacks/mwQueue/History';
import Set from './appPacks/mwQueue/Set';
import List from './appPacks/mwQueue/List';
import Add from './appPacks/mwQueue/Add';
import AdList from './appPacks/mwQueue/AdList';
import AdAdd from './appPacks/mwQueue/AdAdd';
import ReduceDetail from './appPacks/mwQueue/ReduceDetail';
import ReduceAdd from './appPacks/mwQueue/ReduceAdd';
import OrderQueue from './appPacks/mwQueue/OrderQueue';
import OrderAppoint from './appPacks/mwQueue/OrderAppoint';


const routes = [
  // 基础系统
  {
    path: '/system/cloud/home',
    component: Home,
  }, {
    path: '/system/cloud/login',
    component: Login,
  }, {
    path: '/system/cloud/register',
    component: Registers,
  }, {
    path: '/system/cloud/bindCheck',
    component: BindCheck,
  }, {
    path: '/system/cloud/bindUser',
    component: BindUser,
  }, {
    path: '/system/cloud/registerResult',
    component: RegisterResult,
  }, {
    path: '/system/cloud/forgetPassword',
    component: ForgetPassword,
  }, {
    path: '/system/cloud/forgetPasswordResult',
    component: ForgetPasswordResult,
  }, {
    path: '/system/set/businessInfo',
    component: BusinessInfo,
  }, {
    path: '/system/set/staff',
    component: Staff,
  }, {
    path: '/system/set/role',
    component: Role,
  }, {
    path: '/system/set/organization',
    component: Organization,
  }, {
    path: '/system/personal/myBusiness',
    component: MyBusiness,
  }, {
    path: '/system/personal/password',
    component: Password,
  }, {
    path: '/system/personal/baseInfo',
    component: BaseInfo,
  }, {
    path: '/system/set/receiptAccount',
    component: ReceiptAccount,
  }, {
    path: '/system/set/receiptAccount/channel/:accId',
    component: ReceiptChannel,
  }, {
    path: '/system/set/receiptAccount/shop/:accId',
    component: ReceiptShop,
  },
  // 应用系统
  {
    path: '/system/app/market',
    component: Market,
  },
  {
    path: '/system/app/myApp',
    component: MyApp,
  }, {
    path: '/system/app/orderRecord',
    component: OrderRecord,
  }, {
    path: '/system/app/order/:appId',
    component: Order,
  }, {
    path: '/system/app/order/result/:type',
    component: OrderResult,
  }, {
    path: '/system/app/manage/:id',
    component: Manage,
  },
  // 第三方应用-demo系统
  {
    path: '/appPacks/demo/member',
    component: Member,
  },
  // 第三方应用-report系统
  {
    path: '/appPacks/report/dashboard',
    component: Dashboard,
  },
  {
    path: '/appPacks/report/groupActivity',
    component: GroupActivity,
  },
  {
    path: '/appPacks/report/groupIncome',
    component: GroupIncome,
  },
  {
    path: '/appPacks/report/dishesSold',
    component: DishesSold,
  },
  {
    path: '/appPacks/report/rateDishes',
    component: RateDishes,
  },
  {
    path: '/appPacks/report/storeCashier',
    component: StoreCashier,
  },
  {
    path: '/appPacks/report/siteSale',
    component: SiteSale,
  },
  {
    path: '/appPacks/report/groupRecession',
    component: GroupRecession,
  },
  {
    path: '/appPacks/report/operatingIncome',
    component: OperatingIncome,
  },
  {
    path: '/appPacks/report/revenue',
    component: Revenue,
  },
  {
    path: '/appPacks/report/hourAnalysis',
    component: HourAnalysis,
  },
  {
    path: '/appPacks/report/cashBenefit',
    component: CashBenefit,
  },
  {
    path: '/appPacks/report/groupBusiness',
    component: GroupBusiness,
  },
  {
    path: '/appPacks/report/tableStatistics',
    component: TableStatistics,
  },
  {
    path: '/appPacks/report/packageSales',
    component: PackageSales,
  },
  {
    path: '/appPacks/report/billAnalysis',
    component: BillAnalysis,
  },
  {
    path: '/appPacks/report/antiSettlement',
    component: AntiSettlement,
  },
  // 第三方应用-外卖系统
  {
    path: '/appPacks/takeout/baseSet',
    component: TakeOutBaseSet,
  },
  {
    path: '/appPacks/takeout/shopSet',
    component: TakeOutShopSet,
  },
  {
    path: '/appPacks/takeout/order',
    component: TakeOutOrder,
  },
  // 实体卡 card
  {
    path: '/appPacks/mwCRM/cardDetail',
    component: CardDetail,
  },
  {
    path: '/appPacks/mwCRM/cardPrepay',
    component: CardPrepay,
  },
  // 营销管理
  {
    path: '/appPacks/mwCRM/marketActivity',
    component: MarketActivity,
  },
  {
    path: '/appPacks/mwCRM/marketGame',
    component: MarketGame,
  },
  {
    path: '/appPacks/mwCRM/marketEvaluate ',
    component: MarketEvaluate,
  },
  {
    path: '/appPacks/mwCRM/marketPlugin',
    component: MarketPlugin,
  },
  {
    path: '/appPacks/mwCRM/marketFission',
    component: MarketFission,
  },
  {
    path: '/appPacks/mwCRM/marketCode',
    component: MarketCode,
  },
  {
    path: '/appPacks/mwCRM/marketGive',
    component: MarketGive,
  },
  {
    path: '/appPacks/mwCRM/MarketReduce',
    component: MarketReduce,
  },
  // 商家微信
  {
    path: '/appPacks/mwCRM/wxAuth',
    component: WxAuth,
  },
  {
    path: '/appPacks/mwCRM/wxMenu',
    component: WxMenu,
  },
  {
    path: '/appPacks/mwCRM/wxCard',
    component: WxCard,
  },
  {
    path: '/appPacks/mwCRM/wxReply',
    component: WxReply,
  },
  {
    path: '/appPacks/mwCRM/wxSend',
    component: WxSend,
  },
  {
    path: '/appPacks/mwCRM/wxMart',
    component: WxMart,
  },
  {
    path: '/appPacks/mwCRM/wxMaterial',
    component: WxMaterial,
  },
  {
    path: '/appPacks/mwCRM/WxTemplate',
    component: WxTemplate,
  },
  {
    path: '/appPacks/mwCRM/WxShop',
    component: WxShop,
  },
  // 优惠共享规则
  {
    path: '/appPacks/mwCRM/reduceRule',
    component: ReduceRule,
  },
  // 支付宝口碑
  {
    path: '/appPacks/mwCRM/alipayCard',
    component: AlipayCard,
  },
  // 美味预定
  {
    path: '/appPacks/mwOrdain/current',
    component: Current,
  },
  {
    path: '/appPacks/mwOrdain/history',
    component: History,
  },
  {
    path: '/appPacks/mwOrdain/advice',
    component: Advice,
  },
  {
    path: '/appPacks/mwOrdain/listImport',
    component: ListImport,
  },
  {
    path: '/appPacks/mwOrdain/address',
    component: Address,
  },
  {
    path: '/appPacks/mwOrdain/addressImport',
    component: AddressImport,
  },
  {
    path: '/appPacks/mwOrdain/site',
    component: Site,
  },
    // 美味会员
  {
    path: '/appPacks/mwCRM/manageList',
    component: ManageList,
  },
  {
    path: '/appPacks/mwCRM/manageGroup',
    component: ManageGroup,
  },
  {
    path: '/appPacks/mwCRM/manageBlack',
    component: ManageBlack,
  },
  {
    path: '/appPacks/mwCRM/manageLevel',
    component: ManageLevel,
  },
  {
    path: '/appPacks/mwCRM/managePrContent',
    component: ManagePrContent,
  },
  {
    path: '/appPacks/mwCRM/managePrValid',
    component: ManagePrValid,
  },
  {
    path: '/appPacks/mwCRM/managePrDistribute',
    component: ManagePrDistribute,
  },
  {
    path: '/appPacks/mwCRM/manageManual',
    component: ManageManual,
  },
  // 优惠券管理,
  {
    path: '/appPacks/mwCRM/couponList',
    component: CouponList,
  },
  {
    path: '/appPacks/mwCRM/couponCheck',
    component: CouponCheck,
  },
  {
    path: '/appPacks/mwCRM/couponShare',
    component: CouponShare,
  },
  {
    path: '/appPacks/mwCRM/couponDish',
    component: CouponDish,
  },
  {
    path: '/appPacks/mwCRM/couponGift',
    component: CouponGift,
  },
  {
    path: '/appPacks/mwCRM/couponCard',
    component: CouponCard,
  },
  {
    path: '/appPacks/mwCRM/couponCancel',
    component: CouponCancel,
  },
  {
    path: '/appPacks/mwCRM/couponShelf',
    component: CouponShelf,
  },
  // 积分储值score
  {
    path: '/appPacks/mwCRM/scoreMart',
    component: ScoreMart,
  },
  {
    path: '/appPacks/mwCRM/scoreOrder',
    component: ScoreOrder,
  },
  {
    path: '/appPacks/mwCRM/scoreRule',
    component: ScoreRule,
  },
  {
    path: '/appPacks/mwCRM/scoreStore',
    component: ScoreStore,
  },
  {
    path: '/appPacks/mwCRM/scoreRecord',
    component: ScoreRecord,
  },
  {
    path: '/appPacks/mwCRM/storeRecord',
    component: StoreRecord,
  },
  {
    path: '/appPacks/mwCRM/scoreTransition',
    component: ScoreTransition,
  },
  {
    path: '/appPacks/mwCRM/scoreStoreReport',
    component: ScoreStoreReport,
  },
  {
    path: '/appPacks/mwCRM/ScoreReport',
    component: ScoreReport,
  },
  {
    path: '/appPacks/mwCRM/ScoreRefund',
    component: ScoreRefund,
  },
  // 美味排队
  {
    path: '/appPacks/mwQueue/history',
    component: HistoryQueue,
  },
  {
    path: '/appPacks/mwQueue/set',
    component: Set,
  },
  {
    path: '/appPacks/mwQueue/list',
    component: List,
  },
  {
    path: '/appPacks/mwQueue/add',
    component: Add,
  },
  {
    path: '/appPacks/mwQueue/adList',
    component: AdList,
  },
  {
    path: '/appPacks/mwQueue/adAdd',
    component: AdAdd,
  },
  {
    path: '/appPacks/mwQueue/reduceDetail',
    component: ReduceDetail,
  },
  {
    path: '/appPacks/mwQueue/reduceAdd',
    component: ReduceAdd,
  },
  {
    path: '/appPacks/mwQueue/orderQueue',
    component: OrderQueue,
  },
  {
    path: '/appPacks/mwQueue/orderAppoint',
    component: OrderAppoint,
  },
];

const Router = ({ history, app }) => {
  const routerProps = {
    history,
    app,
    routes,
  };

  return <RouterConfig {...routerProps} />;
};
Router.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};
export default Router;
