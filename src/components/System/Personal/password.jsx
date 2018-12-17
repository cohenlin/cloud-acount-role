import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const password = ({
  onChangeOld,
  onOld,
  onNew,
  onRepeatNew,
  form: {
    getFieldDecorator,
    getFieldValue,
    validateFields,
  },
  }) => {
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };
  const formItemLayout = {
    labelCol: { span: 4 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      offset: 4,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err) => {
      if (!err) {
        onChangeOld();
      }
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="原始密码"
          hasFeedback
        >
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: '请输入密码！',
              },
              {
                pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
                message: '请输入至少包含一个大写字母的6至12位密码！',
              },
            ],
          })(
            <Input type="password" style={{ width: 240 }} placeholder="请输入原密码" onChange={onOld} />,
              )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码！',
              },
              {
                pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(
            <Input type="password" style={{ width: 240 }} placeholder="请输入新密码" onChange={onNew} />,
              )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复密码"
          hasFeedback
        >
          {getFieldDecorator('confirmPassword', {
            rules: [{
              required: true,
              message: '请重复新密码!',
            },
            { min: 6,
              message: '密码不少于6位',
            },
            { max: 12,
              message: '密码不超过12位',
            },
            {
              validator: checkPassword,
            }],
          })(
            <Input type="password" style={{ width: 240 }} placeholder="请重复新密码" onChange={onRepeatNew} />,
              )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">修改</Button>
        </FormItem>
      </Form>
    </div>
  );
};

password.propTypes = {
  form: PropTypes.object,
  onChangeOld: PropTypes.func,
  onOld: PropTypes.func,
  onNew: PropTypes.func,
  onRepeatNew: PropTypes.func,
};

export default Form.create()(password);
