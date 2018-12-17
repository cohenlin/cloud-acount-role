const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
};

// 支付管理
const Payment = {
  // 支付渠道
  PayChannel: {
    // 支付宝
    ALIPAY: 'ALIPAY',
    // 微信支付
    WXPAY: 'WXPAY',
  },
  PayAggregator: {
    // 辰森, 直连方式
    CHOICE: 'CHOICE',
    // 微美汇通
    SEMOOR: 'SEMOOR',
  },
  // 状态
  State: {
    ENABLE: '1',
    DISABLED: '0',
  },
  // 是否优惠
  IsDiscount: {
    DISCOUNT: '1',
    NO_DISCOUNT: '0',
  },
  // 服务商模式
  ProviderType: {
    ISV: 'ISV',
    AGGREGATOR: 'AGGREGATOR',
  },
};

module.exports = {
  EnumRoleType,
  Payment,
};
