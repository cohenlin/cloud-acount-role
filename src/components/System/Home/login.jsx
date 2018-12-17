import React, { PropTypes } from 'react';
import { Button, Row, Form, Input } from 'antd';
import { Link } from 'dva/router';
import styles from '../../../common/home.less';

const FormItem = Form.Item;
const login = ({
    loading,
    onLogin,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
    },
  }) => {
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onLogin(values);
    });
  };
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span className={styles.imgs} />
        <span>账号登录</span>
      </div>
      <form>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                message: '手机号格式错误！',
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="常用手机号码" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="登录密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onPressEnter={handleOk} onClick={handleOk} loading={loading}>
            登录
          </Button>
        </Row>
        <Row className={styles.linkTo}>
          <Link to="/system/cloud/register">立即注册</Link>
          <span className={styles.line}>|</span>
          <Link to="/system/cloud/forgetPassword">忘记密码?</Link>
        </Row>
      </form>
    </div>
  );
};

login.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  onLogin: PropTypes.func,
};

export default Form.create()(login);
