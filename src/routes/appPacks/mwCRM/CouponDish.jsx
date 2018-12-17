/* CREATE BY xiaochenghua 2018/04/03 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function CouponDish({ cloudState }) {
  const { urlCouponDish } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlCouponDish,
    MWTenantSelected,
    authType,
    authCode,
    iframeHight: 1100,
  };
  return (
    <div className="iframe-box">
      <MWIframe {...iframeProps} />
    </div>
  );
}
function mapStateToProps(cloudState) {
  return { cloudState };
}
CouponDish.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(CouponDish);
