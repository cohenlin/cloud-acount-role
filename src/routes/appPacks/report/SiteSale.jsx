/* CREATE BY YBY 2018/02/13 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';

function Market({ cloudState }) {
  const {
    urlSiteSale,
  } = cloudState.report;
  return (
    <div className="iframe-box">
      <iframe scrolling="no" src={urlSiteSale} frameBorder="0" style={{ width: '100%', height: 1100, overflowX: 'hidden' }} />
    </div>
  );
}
function mapStateToProps(cloudState) {
  return { cloudState };
}
Market.propTypes = {
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(Market);
