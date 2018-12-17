/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Result from '../../components/System/ForgetPassword/result';
import styles from '../../common/Register.less';
import Header from '../../components/System/Home/header';
import Footer from '../../components/System/Home/footer';


const ForgetPasswordResult = ({ cloudState }) => {
  const { count } = cloudState.forgetPasswordResult;
  const resultProps = {
    count,
    title: '你的密码重置成功',
  };
  return (
    <div>
      <Header />
      <Result
        {...resultProps} className={styles.registerResult}
      />
      <Footer />
    </div>
  );
};

ForgetPasswordResult.propTypes = {
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(ForgetPasswordResult);

