/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const form = ({
                item,
                getFieldDecorator,
                onItemChange,
              }) => {
  const FormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <div>
      <FormItem label="签名类型" {...FormItemLayout}>
        {getFieldDecorator('signType', {
          initialValue: item.signType || 'RSA2',
        })(<Select onChange={e => onItemChange(e, 'signType')}>
          <Option value="RSA">RSA</Option>
          <Option value="RSA2">RSA2</Option>
        </Select>)}
      </FormItem>
      <FormItem label="appId" {...FormItemLayout}>
        {getFieldDecorator('appId', {
          initialValue: item.appId,
          rules: [
            {
              message: '请输入appId！',
              required: true,
            },
            {
              pattern: /^[a-zA-Z0-9]{1,32}$/,
              message: 'appId输入不合法！',
            },
          ],
        })(<Input type="text" />)}
      </FormItem>
      <FormItem label="商户私钥" {...FormItemLayout}>
        {getFieldDecorator('privateKey', {
          initialValue: item.privateKey,
          rules: [{
            message: '请输入商户私钥！',
            required: true,
          }, {
            pattern: /^[a-zA-Z0-9]{1,32}$/,
            message: '商户私钥输入不合法！',
          }],
        })(<TextArea rows={4} />)}
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
