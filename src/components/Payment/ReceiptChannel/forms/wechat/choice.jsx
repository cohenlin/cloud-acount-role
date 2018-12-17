/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Input } from 'antd';
import PaymentUpload from '../../../../common/PaymentUpload/index';

const FormItem = Form.Item;

const form = ({
                 item,
                 getFieldDecorator,
                 onItemChange,
}) => {
  const FormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const uploadProps = {
    btnText: '上传证书',
    detail() {
      if (item.certificate) {
        return (<span>已有证书</span>);
      }
      return <span>未上传证书</span>;
    },
    onSucceed(data) {
      onItemChange(data, 'certificate');
    },
  };
  return (
    <div>
      <FormItem label="appId" {...FormItemLayout}>
        {getFieldDecorator('appId', {
          initialValue: item.appId,
          rules: [{
            message: '请输入appId！',
            required: true,
          }, {
            pattern: /^[a-zA-Z0-9]{1,32}$/,
            message: 'appId输入不合法！',
          }],
        })(<Input type="text" />)}
      </FormItem>
      <FormItem label="商户号" {...FormItemLayout}>
        {getFieldDecorator('mchId', {
          initialValue: item.mchId,
          rules: [{
            message: '请输入商户号！',
            required: true,
          }, {
            pattern: /^[a-zA-Z0-9]{1,32}$/,
            message: '商户号输入不合法！',
          }],
        })(<Input type="text" />)}
      </FormItem>
      <FormItem label="商户密钥" {...FormItemLayout}>
        {getFieldDecorator('mchKey', {
          initialValue: item.mchKey,
          rules: [{
            message: '请输入商户密钥！',
            required: true,
          }, {
            pattern: /^[a-zA-Z0-9]{1,32}$/,
            message: '商户密钥输入不合法！',
          }],
        })(<Input type="text" />)}
      </FormItem>
      <FormItem label="上传证书" {...FormItemLayout}>
        {getFieldDecorator('certificateFile', {
          initialValue: 456,
          rules: [{
            message: '请上传文件！',
            required: true,
          }],
        })(<Input type="text" style={{ display: 'none' }} />)}
        <PaymentUpload {...uploadProps} />
      </FormItem>
    </div>
  );
};

form.propTypes = {
  item: PropTypes.object,
  getFieldDecorator: PropTypes.func,
  onItemChange: PropTypes.func,
};

export default form;
