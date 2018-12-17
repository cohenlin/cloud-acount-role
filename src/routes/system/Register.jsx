/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Item from '../../components/System/Register/item';
import Header from '../../components/System/Home/header';
import Footer from '../../components/System/Home/footer';

const Register = ({ dispatch, cloudState }) => {
  const { count, phoneNumber, modalVisible, allowSubmit } = cloudState.register;
  const itemProps = {
    count,
    allowSubmit,
    phoneNumber,
    modalVisible,

    onChangePrefix(value) {
      dispatch({
        type: 'register/updateState',
        payload: {
          prefix: value,
        },
      });
    },
    // 点击协议
    onChangeAgreement(e) {
      const { checked } = e.target;
      dispatch({
        type: 'register/updateState',
        payload: {
          allowSubmit: checked,
        },
      });
    },
    // 验证码倒计时
    onGetCaptcha() {
      let countCache = 59;
      dispatch({
        type: 'register/sendSmsVerificationCode',
        payload: {
          phoneNumber,
        },
      });
      dispatch({
        type: 'register/updateState',
        payload: {
          count: countCache,
        },
      });
      const interval = setInterval(() => {
        countCache -= 1;
        dispatch({
          type: 'register/updateState',
          payload: {
            count: countCache,
          },
        });
        if (countCache === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    // 手机号改变
    onChangeMobile(ev) {
      const newVal = ev.target.value;
      dispatch({
        type: 'register/updateState',
        payload: {
          phoneNumber: newVal,
        },
      });
    },
    // 提交信息
    onSubmitInfo(value) {
      dispatch({
        type: 'register/register',
        payload: {
          repeatUserPass: value.repeatUserPass, // 重复密码
          userAccount: value.userAccount, // 账号
          userName: value.userName, // 用户名
          userPass: value.userPass, // 密码
          verificationCode: value.verificationCode, // 验证码
        },
      });
    },
    onShowModal() {
      dispatch({
        type: 'register/showModal',
      });
    },
    onHandleCancel() {
      dispatch({
        type: 'register/hideModal',
      });
    },
  };

  return (
    <div>
      <Header />
      <Item {...itemProps} />
      <Footer />
    </div>
  );
};

Register.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Register);

