/* CREATE BY yunbaoyuan 2018/02/02 下午13:26:16*/
import React, { PropTypes } from 'react';
import { Form, Input, Button, Col, Row, Divider, Tag, Icon, Modal } from 'antd';
// import app from '../../../models/app';

const FormItem = Form.Item;

const item = ({
    loading,
    appInfos,
    orderDuration,
    treeShopOption,
    onChooseShop,
    onChooseDuration,
    onAdd,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      // validateTrigger,
    },
  }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const formItemLayout1 = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 4 },
    },
  };
  // 选择订购时长
  const loopDuration = data => (data.map((time) => {
    if (time === orderDuration) {
      return <Button className="btn-r16" type="primary" key={time} >{time}个月</Button>;
    }
    return (<Button
      className="btn-r16"
      key={time}
      onClick={() => onChooseDuration(time)}
      disabled={loading}
    >
      {time}个月
    </Button>);
  }));
  // 订购门店数
  const orderShopNum = treeShopOption.checkedKeys.length > 0 ?
    treeShopOption.checkedKeys.length : 0;
  // 订单金额
  const prices = () => {
    if (appInfos.sellStrategy === 0) { // 售卖策略0免费
      return '免费';
    }
    if (appInfos.sellType === 0) { // 按门店售卖
      if (appInfos.price === -1) {
        return '面议';
      }
      if (appInfos.authType === 0) { // 授权方式0永久
        return appInfos.price * treeShopOption.checkedKeys.length;
      }
      return appInfos.price * treeShopOption.checkedKeys.length * orderDuration;
    }
    // 按商户售卖
    if (appInfos.price === -1) {
      return '面议';
    }
    if (appInfos.authType === 0) {
      return appInfos.price;
    }
    return appInfos.price * orderDuration;
  };
  // 订购时长
  const authDuration = () => {
    if (appInfos.sellStrategy === 0) { // 售卖策略0免费
      if (appInfos.freeDuration === -1) {
        return '永久';
      }
      return `${appInfos.freeDuration}天`;
    }
    // 付费
    if (appInfos.authType === 0) {
      return '永久';
    }
    return loopDuration(appInfos.authDuration);
  };
  const info = (title) => {
    Modal.info({
      title,
      onOk() {},
    });
  };
  const showPre = (apps) => {
    if (apps.preAppsName.length > 0) {
      return (<p style={{ color: '#FF4500' }}>*订购此应用请先订购{apps.preAppsName.map(val => (` [ ${val} ] `))}应用。</p>);
    }
    return null;
  };
  const showMutex = (apps) => {
    if (apps.mutexAppsName.length > 0) {
      return (<p style={{ color: '#FF4500' }}>*此应用不可与{apps.mutexAppsName.map(val => (` [ ${val} ] `))}同时上架使用。</p>);
    }
    return null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 判断是否选择了订购时长
    if (!orderDuration && Object.prototype.toString.call(authDuration()) === '[object Array]') {
      info('请选择订购时长');
      return false;
    }
    // 判断选择门店数是否为0
    if (orderShopNum === 0) {
      info('请选择门店');
      return false;
    }
    validateFields((err) => {
      if (!err) {
        // 根据周期类型决定返回的period值，以便进行分类显示为‘永久’‘xx个月’‘xx天’
        let duration;
        if (!orderDuration) {
          // 永久
          if (authDuration() === '永久') {
            duration = -1;
          } else {         // 按天
            duration = parseInt(authDuration(), 10);
          }
        } else {         // 按月
          duration = orderDuration * 30;
        }
        // 订单总金额
        let allPrice;
        if (appInfos.price === -1) {         // 面议
          allPrice = appInfos.price;
        } else if (appInfos.price === 0 && appInfos.sellStrategy === 1) { // 收价格费为零
          allPrice = -2;
        } else if (appInfos.sellStrategy === 1 && authDuration() === '永久') {  // 收费时长为永久
          allPrice = prices();
        } else if (appInfos.sellType === 1) {         // 收费有时长按商户
          allPrice = appInfos.price * orderDuration;
        } else {              // 收费有时长按门店
          allPrice = appInfos.price * orderDuration * orderShopNum;
        }
        const params = {
          ...getFieldsValue(),
          period: duration,
          namt: allPrice, /* appInfos.price === -1 ? appInfos.price :
            (appInfos.price * orderDuration * orderShopNum),*/
        };
        onAdd(params);
      }
    });
    return true;
  };
  return (
    <div className="appOrderItem">
      <Form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
        {/* 应用基本信息开始 */}
        <div className="avatar-content">
          <div className="avatar-content-avatar">
            <img src={appInfos.applicationIcon} className="" alt="" style={{ width: '120px', height: '120px' }} />
          </div>
          <div className="avatar-content-content">
            <h4 className="avatar-content-title" style={{ fontSize: '16px', color: '#333' }}>{appInfos.applicationName}</h4>
            <div className="avatar-content-description" style={{ fontSize: '12px', color: '#666' }}>{appInfos.description}</div>
            <div style={{ marginTop: 10 }}>
              {appInfos.sellStrategy === 0 && <Tag color="green">免费</Tag>}
              {appInfos.sellStrategy === 1 && <Tag color="orange">收费</Tag>}
              {appInfos.price === -1 ? <Tag color="blue">面议</Tag> : null }
            </div>
            {appInfos.sellStrategy === 1 && <div style={{ marginTop: 15 }}>{appInfos.price !== -1 ? <span className="order-price-display">&yen;{appInfos.price}</span> : null }
                {!appInfos.authType && !appInfos.sellType && appInfos.price !== -1 ? '/店' : null }
                {!appInfos.authType && appInfos.sellType && appInfos.price !== -1 ? '/商户' : null}
                {appInfos.authType && !appInfos.sellType && appInfos.price !== -1 ? '/月/店' : null}
                {appInfos.authType && appInfos.sellType && appInfos.price !== -1 ? '/月/商户' : null}
              </div>}
            {appInfos.preAppsName ? showPre(appInfos) : null}
            {appInfos.mutexAppsName ? showMutex(appInfos) : null}
          </div>
        </div>
        {/* 应用基本信息结束 */}
        <Divider />
        <Row>
          <Col span={24} >
            <FormItem
              {...formItemLayout}
              label="订购时长"
            >
              <div className="btn-group">
                { authDuration() }
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="订购门店"
            >
              <div>
                <span style={{ verticalAlign: 'top' }}>{loading ? <Icon type="loading" style={{ color: '#008dff' }} /> : orderShopNum }家</span>
                <button className="btn-link" type="button" onClick={onChooseShop}>修改</button>
              </div>
            </FormItem>
            <Divider />
            <FormItem
              {...formItemLayout}
              label="订单金额"
            >
              {
                <div>
                  {typeof prices() === 'number' ?
                    <span className="order-price-form">&yen;{prices()}</span>
                    : <span className="order-price-form">{prices()}</span>
                  }
                </div>
              }
            </FormItem>
            <Divider />
            <FormItem
              {...formItemLayout1}
              label="订购人姓名"
            >
              {getFieldDecorator('connectName', {
                rules: [{
                  required: true, message: '请输入姓名',
                }, {
                  pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/, message: '请输入2-10位中文或英文字符！',
                }],
              })(
                <Input placeholder="请输入2-10位中文或英文字符！" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout1}
              label="手机号"
            >{getFieldDecorator('connectMobile', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true, message: '请输入手机号！',
              }, {
                pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式错误！',
              }],
            })(
              <Input type="text" placeholder="请输入手机号" />,
                )}

            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit">确认订购</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: appInfos.viewPath || null }} className="appInfo" />
    </div>
  );
};

item.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  appInfos: PropTypes.object,
  orderDuration: PropTypes.number,
  treeShopOption: PropTypes.object,
  onChooseShop: PropTypes.func,
  onChooseDuration: PropTypes.func,
  onAdd: PropTypes.func,
};
export default Form.create()(item);
