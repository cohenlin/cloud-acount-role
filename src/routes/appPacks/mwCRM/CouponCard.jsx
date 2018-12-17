/* CREATE BY xiaochenghua 2018/04/03 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function CouponCard({ cloudState }) {
  const { urlCouponCard } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlCouponCard,
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
CouponCard.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(CouponCard);
