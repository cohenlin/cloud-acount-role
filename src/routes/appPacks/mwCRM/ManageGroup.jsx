/* CREATE BY xiaochenghua 2018/04/02 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';


function ManageGroup({ cloudState }) {
  const { urlManageGroup } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlManageGroup,
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
ManageGroup.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(ManageGroup);
