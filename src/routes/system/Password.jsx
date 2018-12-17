import React, { PropTypes } from 'react';
import { connect } from 'dva';
import ChangePassword from '../../components/System/Personal/password';

const Password = ({ cloudState, dispatch }) => {
  const { id } = cloudState.password;
  const passwordProps = {
    onChangeOld(value) {
      dispatch({
        type: 'password/editPassword',
        payload: {
          id,
          oldUserPass: value,
          firstNewUserPass: value,
          secondNewUserPass: value,
        },
      });
      // 提交基础信息修改

      // dispatch({
      //   type: 'baseInfo/updateState',
      //   payload: {
      //   },
      // });
    },

    onOld(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'password/updateState',
        payload: {
          oldUserPass: newValue,
        },
      });
    },
    onNew(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'password/updateState',
        payload: {
          firstNewUserPass: newValue,
        },
      });
    },
    onRepeatNew(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'password/updateState',
        payload: {
          secondNewUserPass: newValue,
        },
      });
    },
  };
  return (
    <div>
      <ChangePassword {...passwordProps} />
    </div>
  );
};

Password.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Password);

