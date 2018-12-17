import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MyBusinessIndex from '../../components/System/Personal/myBusiness';
import config from '../../utils/config';

const MyBusiness = ({ cloudState, dispatch }) => {
  const { loading, contactList } = cloudState.myBusiness;
  const MyBusinessProps = {
    contactList,
    loading,
    onContact(event) {
      dispatch({
        type: 'myBusiness/setCurrentTenant',
        payload: {
          tenantId: event.target.value,
        },
      });
    },
  };
  return (
    <div>
      <MyBusinessIndex {...MyBusinessProps} />
      {/* 报表登出操作 */}
      {contactList.length > 1 && <iframe src={`${config.domainReport}logout`} height={0} frameBorder="0" />}
    </div>
  );
};

MyBusiness.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(MyBusiness);

