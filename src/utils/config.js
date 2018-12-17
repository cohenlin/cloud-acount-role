const PAYMENT = '/plMerchant';
// const TEST_PAYMENT = '/test_payment';

module.exports = {
  name: '辰森云平台',
  prefix: 'rt-report',
  footerText: '辰森云平台管理系统 v1.0',
  logo: './images/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/system/cloud/home', '/system/cloud/register', '/system/cloud/bindCheck', '/system/cloud/bindUser', '/system/cloud/registerResult', '/system/cloud/forgetPassword', '/system/cloud/forgetPasswordResult'],
  apiPrefix: '/api/v1',
  // 本地测试打包配置
  // domainReport: 'http://localhost:8002/index.html#/', // 报表系统主域名
  // domainTakeout: 'http://localhost:8003/index.html#/', // 外卖系统主域名
  // domainMWLogin: 'http://shop.test.9now.net/bmanage/account/chenshen-login', // 美味访问入口地址
  // domainMWCrm: 'http://crm.test.9now.net/', // 美味会员主域名
  // domainMWCommon: 'http://shop.test.9now.net/', // 美味普通页面主域名

  // 测试环境打包配置
  domainReport: 'http://report.dev.choicesaas.cn/index.html#/', // 报表系统主域名
  domainTakeout: 'http://wm.dev.choicesaas.cn/index.html#/', // 外卖系统主域名
  domainMWLogin: 'http://shop.test.9now.net/bmanage/account/chenshen-login', // 美味访问入口地址
  domainMWCrm: 'http://crm.test.9now.net/', // 美味会员主域名
  domainMWCommon: 'http://shop.test.9now.net/', // 美味普通页面主域名

  // 生产环境打包配置
  // domainReport: 'http://reportyun.choicesaas.cn/index.html#/', // 报表系统主域名
  // domainTakeout: 'http://wmyun.choicesaas.cn/index.html#/', // 外卖系统主域名
  // domainMWLogin: 'http://shop.mwee.cn/bmanage/account/chenshen-login', // 美味访问入口地址
  // domainMWCrm: 'http://crm.mwee.cn/', // 美味会员主域名
  // domainMWCommon: 'http://shop.mwee.cn/', // 美味普通页面主域名
  api: {
    payment: {
      sessionKey: 'merchantKey',
      bindAccount: `${PAYMENT}`,
      receiptAccount: `${PAYMENT}`,
      receiptChannel: `${PAYMENT}`,
      receiptShop: `${PAYMENT}`,
    },
  },
};
