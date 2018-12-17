/* CREATE BY xiaochenghua 2018/04/03 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function CouponList({ cloudState }) {
  const { urlCouponList } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlCouponList,
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
CouponList.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(CouponList);
