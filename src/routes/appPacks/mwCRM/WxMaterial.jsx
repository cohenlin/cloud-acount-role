/* CREATE BY xiaochenghua 2018/04/02 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function WxMaterial({ cloudState }) {
  const { urlWxMaterial } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlWxMaterial,
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
WxMaterial.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(WxMaterial);
