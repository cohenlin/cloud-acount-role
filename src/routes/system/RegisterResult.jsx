/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Result from '../../components/System/Register/result';
import styles from '../../common/Register.less';
import Header from '../../components/System/Home/header';
import Footer from '../../components/System/Home/footer';


const RegisterResult = ({ cloudState }) => {
  const { count } = cloudState.registerResult;
  const registerResultProps = {
    count,
    title: '你的辰森帐号注册成功',
  };
  return (
    <div>
      <Header />
      <Result
        {...registerResultProps} className={styles.registerResult}
      />
      <Footer />
    </div>
  );
};

RegisterResult.propTypes = {
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(RegisterResult);

