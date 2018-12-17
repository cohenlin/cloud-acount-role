/* CREATE BY xiaochenghua 2018/04/02 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function AdAdd({ cloudState }) {
  const { urlAdAdd } = cloudState.mwQueue;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlAdAdd,
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
AdAdd.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(AdAdd);
