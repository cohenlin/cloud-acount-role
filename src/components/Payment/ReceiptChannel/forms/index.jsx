/**
 * Create by liukang on 2018/3/8
 * */
import React, { PropTypes } from 'react';
import ErrorForm from './errorForm';
import { Payment } from '../../../../utils/enums';
import Wechat from './wechat';
import Alipay from './alipay';

const { ProviderType, PayChannel, PayAggregator } = Payment;

const ProviderForm = ({ item, ...props }) => {
  const formProps = {
    ...props,
    item,
  };
  let ConfigForm = ErrorForm;
  const channelCode = item.channelCode;
  const aggCode = item.aggCode;
  const isIsv = item.type === ProviderType.ISV;
  // 微信
  if (channelCode === PayChannel.WXPAY) {
    const channel = Wechat;
    switch (aggCode) {
      // 辰森
      case PayAggregator.CHOICE:
        if (isIsv) {
          ConfigForm = channel.Isv;
        } else {
          ConfigForm = channel.Choice;
        }
        break;
      // 唯美
      case PayAggregator.SEMOOR:
        ConfigForm = channel.Weimei;
        break;
      default:
    }
  }
  // 支付宝
  if (channelCode === PayChannel.ALIPAY) {
    const channel = Alipay;
    switch (aggCode) {
      // 辰森
      case PayAggregator.CHOICE:
        ConfigForm = channel.Choice;
        break;
      default:
    }
  }
  return (
    <ConfigForm {...formProps} />
  );
};

ProviderForm.propTypes = {
  item: PropTypes.object,
};

export default ProviderForm;
