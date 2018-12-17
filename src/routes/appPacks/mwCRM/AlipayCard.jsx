/* CREATE BY LMM 2018/04/02 下午6点*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';

function AlipayCard({ cloudState }) {
  const { urlAlipayCard } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlAlipayCard,
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
AlipayCard.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(AlipayCard);
