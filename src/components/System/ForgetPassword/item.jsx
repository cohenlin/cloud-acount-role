import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import styles from '../../../common/Register.less';

const FormItem = Form.Item;
const { Option } = Select;

const item = ({
    onChangeMobile,
    count,  // 倒计时
    onChangePrefix,
    phoneNumber,
    onGetCaptcha,
    onSubmitInfo,   //  提交信息
    form: {
      getFieldDecorator,
      validateFields,
      getFieldValue,
      getFieldError,
    },
  }) => {
  const prefixSelector = getFieldDecorator('region', {
    initialValue: '86',
  })(<Select
    size="large"
    onChange={onChangePrefix}
    style={{ width: 80 }}
  >
    <Option value="86">+86</Option>
  </Select>);
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmitInfo(values);
      }
    });
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && value !== getFieldValue('userPass')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };
  const getVeriBtnStatus = () => { // 判断获取验证码按钮状态
    if (phoneNumber.length === 11) {
      return getFieldError('userAccount') ? true : count;
    }
    return true;
  };
  return (<div className={styles.main}>
    <h3>重置密码</h3>
    <Form onSubmit={handleSubmit}>
      <FormItem
        required
      >
        {getFieldDecorator('userAccount', {
          rules: [
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '手机号格式错误！',
            },
          ],
        })(
          <Input
            addonBefore={prefixSelector}
            size="large"
            style={{ width: '100%' }}
            placeholder="请输入11位手机号"
            onChange={onChangeMobile}
          />,
        )}
      </FormItem>
      <FormItem>
        <Row gutter={8}>
          <Col span={16}>
            {getFieldDecorator('verificationCode', {
              validateTrigger: 'onSubmit',
              rules: [
                {
                  required: true,
                  message: '请输入您收到的验证码！',
                },
              ],
            })(<Input size="large" placeholder="请输入验证码" />)}
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={getVeriBtnStatus()}
              className={styles.getCaptcha}
              type="primary"
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('userPass', {
          rules: [
            {
              required: true,
              message: '请输入新密码！',
            },
            {
              pattern: /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,12}$/,
              message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
            },
          ],
        })(
          <Input
            size="large"
            type="password"
            placeholder="请输入新密码"

          />,
          )}
      </FormItem>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('repeatUserPass', {
          rules: [
            {
              required: true,
              message: '请确认密码！',
            },
            {
              validator: checkConfirm,
            },
          ],
        })(<Input size="large" type="password" placeholder="请确认密码" />)}
      </FormItem>
      <FormItem>
        <Button
          size="large"
          className={styles.submit}
          type="primary"
          htmlType="submit"
        >
          重置
        </Button>
        <Link className={styles.login} to="/system/cloud/home">
          返回首页
        </Link>
      </FormItem>
    </Form>
  </div>);
};
item.propTypes = {
  form: PropTypes.object,
  onChangeMobile: PropTypes.func,
  phoneNumber: PropTypes.string,
  count: PropTypes.number,
  onChangePrefix: PropTypes.func,
  onGetCaptcha: PropTypes.func,
  onSubmitInfo: PropTypes.func,
};

export default Form.create()(item);
