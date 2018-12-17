import React, { PropTypes } from 'react';
import { connect } from 'dva';
import BaseInformation from '../../components/System/Personal/baseInfo';

const BaseInfo = ({ cloudState, dispatch }) => {
  const { id, userAccount, userName } = cloudState.baseInfo;
  const { contactBtn, personalBtnStatus, contactBtnName } = cloudState.account;

  const basicInformation = {
    id,
    userAccount,
    userName,
    contactBtn,
    contactBtnName,
    personalBtnStatus,
    onBaseInfo(value) {
      dispatch({
        type: 'baseInfo/editBaseInfo',
        payload: {
          id,
          ...value,
        },
      });
    },
    onName(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'baseInfo/updateState',
        payload: {
          userName: newValue,
        },
      });
    },
    onAccount(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'baseInfo/updateState',
        payload: {
          userAccount: newValue,
        },
      });
    },
  };
  return (
    <div>
      <BaseInformation {...basicInformation} />
    </div>
  );
};

BaseInfo.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(BaseInfo);

