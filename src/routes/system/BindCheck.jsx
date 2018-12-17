/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import Header from '../../components/System/Home/header';
import Footer from '../../components/System/Home/footer';

const BindCheck = () => (
  <div>
    <Header />
    <div style={{ height: 500, paddingTop: 200, textAlign: 'center' }}>
          账户验证中...
      </div>
    <Footer />
  </div>
  );

BindCheck.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};


export default BindCheck;

