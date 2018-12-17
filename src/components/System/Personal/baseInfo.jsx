import React, { PropTypes } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { getSession } from '../../../utils/index';

const FormItem = Form.Item;

const baseInfo = ({
    onBaseInfo,
    userName,
    userAccount,
    onAccount,
    onName,
    form: {
       getFieldDecorator,
       validateFields,
    },
                  }) => {
  const localUserName = getSession('username');
  const FormItemLayout1 = {
    labelCol: { span: 4 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      offset: 4,
    },
  };
  const handleSubmit = () => {
    validateFields((err, value) => {
      if (!err) {
        Modal.confirm({
          title: '点击继续后将会重新登录，是否继续？',
          okText: '继续',
          cancelText: '取消',
          onOk: () => onBaseInfo(value),
        });
      }
    });
  };

  return (
    <div>
      <Form>
        <FormItem
          {...FormItemLayout1}
          label="姓名"
        >
          {getFieldDecorator('userName', {
            initialValue: userName,
            rules: [{
              message: '请输入姓名！',
              required: true,
            }, {
              pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/, message: '请输入2-10位中文或英文字符！',
            }],
          })(
            <Input type="text" style={{ width: 240 }} onChange={onName} />,
          )}
        </FormItem>
        <FormItem
          {...FormItemLayout1}
          label="手机号"
        >
          {getFieldDecorator('userAccount', {
            initialValue: userAccount,
            rules: [{
              message: '请输入手机号！',
              // required: true,
            }, {
              pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式错误！',
            }],
          })(
            <Input type="text" style={{ width: 240 }} onChange={onAccount} disabled />,
          )}

        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={handleSubmit} disabled={localUserName === userName}>保存</Button>
        </FormItem>
      </Form>
    </div>
  );
};

baseInfo.propTypes = {
  form: PropTypes.object,
  onBaseInfo: PropTypes.func,
  onName: PropTypes.func,
  onAccount: PropTypes.func,
  userName: PropTypes.string,
  userAccount: PropTypes.string,
};

export default Form.create()(baseInfo);
