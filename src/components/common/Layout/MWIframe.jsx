import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import config from '../../../utils/config';

const MWIframe = ({
  urlPage,
  MWTenantSelected,
  authType,
  authCode,
  iframeHight,
}) => {
  const urlIframe = `${config.domainMWLogin}?${authType}=${authCode}&meiweiTenantId=${MWTenantSelected}&redirct=${encodeURIComponent(urlPage)}`;
  return (
    <div>
      { authType && MWTenantSelected ? <iframe scrolling="no" src={urlIframe} frameBorder="0" style={{ width: '100%', height: iframeHight, overflowX: 'hidden' }} /> : <div className="iframe-spin"><Spin /></div>}
    </div>
  );
};
MWIframe.propTypes = {
  urlPage: PropTypes.string,
  MWTenantSelected: PropTypes.string,
  authType: PropTypes.string,
  authCode: PropTypes.string,
  iframeHight: PropTypes.number,
};

export default MWIframe;
