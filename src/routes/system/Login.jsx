import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Item from '../../components/System/Login/item';

const Login = ({ cloudState }) => {
  const {
     name,
  } = cloudState.login;
  const {
    loading,
  } = cloudState.account;

  // 获取基础资料,如果可以取得user的session，那么就读取基础资料信息
  const itemProps = {
    loading,
    name,
  };

  return (
    <div className="login-page">
      <Item {...itemProps} />
    </div>
  );
};

Login.propTypes = {
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Login);

