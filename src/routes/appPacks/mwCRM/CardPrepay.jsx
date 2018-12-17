/* CREATE BY LMM 2018/04/03 上午10点*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MWIframe from '../../../components/common/Layout/MWIframe';

function CardPrepay({ cloudState }) {
  const { urlCardPrepay } = cloudState.mwCRM;
  const { MWTenantSelected, authType, authCode } = cloudState.account;
  const iframeProps = {
    urlPage: urlCardPrepay,
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
CardPrepay.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(CardPrepay);
