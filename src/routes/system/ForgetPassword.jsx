/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Item from '../../components/System/ForgetPassword/item';
import Header from '../../components/System/Home/header';
import Footer from '../../components/System/Home/footer';


const ForgetPassword = ({ dispatch, cloudState }) => {
  const { count, prefix, phoneNumber } = cloudState.forgetPassword;
  const itemProps = {
    count,
    prefix,
    phoneNumber,

    onChangePrefix(value) {
      dispatch({
        type: 'forgetPassword/updateState',
        payload: {
          prefix: value,
        },
      });
    },
    // 手机号改变
    onChangeMobile(event) {
      const value = event.target.value;
      dispatch({
        type: 'forgetPassword/updateState',
        payload: {
          phoneNumber: value,
        },
      });
    },
    // 提交信息
    onSubmitInfo(value) {
      dispatch({
        type: 'forgetPassword/forgetPassword',
        payload: {
          repeatUserPass: value.repeatUserPass, // 重复密码
          userAccount: value.userAccount, // 账号
          userPass: value.userPass, // 密码
          verificationCode: value.verificationCode, // 验证码
        },
      });
    },

    // 验证码倒计时
    onGetCaptcha() {
      let countCache = 59;
      dispatch({
        type: 'forgetPassword/sendSmsVerificationCode',
        payload: {
          phoneNumber,
        },
      });
      dispatch({
        type: 'forgetPassword/updateState',
        payload: {
          count: countCache,
        },
      });
      const interval = setInterval(() => {
        countCache -= 1;
        dispatch({
          type: 'forgetPassword/updateState',
          payload: {
            count: countCache,
          },
        });
        if (countCache === 0) {
          clearInterval(interval);
        }
      }, 1000);
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

ForgetPassword.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,

};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(ForgetPassword);

