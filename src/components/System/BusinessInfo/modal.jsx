/**
 * Created by Lumingming on 2018/3/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input, Row, Col } from 'antd';
import styles from '../../../common/Register.less';

const FormItem = Form.Item;
const modal = ({
  form: {
     getFieldDecorator,
     validateFields,
     getFieldError,
     resetFields,
  },
  maskClosable,
  title,
  visible,
  onCancel,
  onCheck,
  verificationCode,
  onGetCaptcha,
  businessButton,
  count,
  superMobile,
  // phoneNumber,
  onSubmit,
  onChangeMobile,
  onChangeName,
 }) => {
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
  const getVeriBtnStatus = () => { // 判断验获取证码按钮状态
    if (superMobile.length === 11) {
      return getFieldError('userAccount') ? true : count;
    }
    return true;
  };
  /* const getVerCodeBtnStatus = () => {
    if (count > 0) {
      return true;
    }
    if (getFieldValue('userAccount') !== getsuperMobile) {
      if (getFieldError('userAccount')) {
        // 手机号变了，并且验证没通过
        return true;
      }
      // 手机号变了，并且验证通过了
      return false;
    }
    // 手机号没变
    return true;
  };*/
  // const verCodeRequired = getFieldValue('userAccount') === getsuperMobile ? false : 1;
  const modalProps = {
    maskClosable,
    title,
    visible,
    onOk: handleSubmit,
    onCancel,
    onCheck,
    verificationCode,
    businessButton,
    count,
    onGetCaptcha,
    superMobile,
    afterClose: resetFields,
  };
  return (
    <Modal
      {...modalProps}
    >
      <div>
        <Form
          style={{ marginTop: 8 }}
        >
          <FormItem
            {...formItemLayout}
            label="原管理员手机号"
          >
            <span>{superMobile}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机验证码"
          >
            <Row gutter={8}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                {getFieldDecorator('verificationCode', {
                  initialValue: '',
                  validateTrigger: ['onBlur', 'onSubmit'],
                  rules: [
                    { required: true, message: '请输入验证码' },
                    {
                      pattern: /[0-9]{6}/,
                      message: '请输入6位数字',
                    },
                  ],
                })(<Input placeholder="请输入验证码" disabled={!businessButton.edit} />)}
              </Col>
              <Col xs={10} sm={12} md={12} lg={12} xl={12}>
                <Button
                  className={styles.getCaptcha}
                  type="primary"
                  onClick={onGetCaptcha}
                  disabled={getVeriBtnStatus()}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新管理员姓名"
            required
          >
            {getFieldDecorator('newSuper', {
              key: 'newSuper',
              rules: [
                {
                  required: true,
                  message: '请输入新管理员姓名!',
                },
                {
                  pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                  message: '请输入2到10位的中文或英文字符！',
                },
              ],
            })(
              <Input
                size="large"
                style={{ width: '100%' }}
                placeholder="请输入新管理员姓名"
                onChange={onChangeName}
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新管理员手机号"
            required
          >
            {getFieldDecorator('userAccount', {
              key: 'userAccount',
              validateTrigger: ['onBlur', 'onSubmit'],
              rules: [
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                  message: '手机号格式错误！',
                },
              ],
            })(
              <Input
                size="large"
                style={{ width: '100%' }}
                placeholder="请输入11位手机号"
                onChange={onChangeMobile}
              />,
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};
modal.propTypes = {
  title: PropTypes.string,
  form: PropTypes.object,
  maskClosable: PropTypes.bool,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onCheck: PropTypes.func,
  verificationCode: PropTypes.string,
  onGetCaptcha: PropTypes.func,
  businessButton: PropTypes.object,
  count: PropTypes.number,
  superMobile: PropTypes.string,
  onSubmit: PropTypes.func,
  // phoneNumber: PropTypes.string,
  onChangeMobile: PropTypes.func,
  onChangeName: PropTypes.func,
};

export default Form.create()(modal);
