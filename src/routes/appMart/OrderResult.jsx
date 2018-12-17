/* CREATE BY lumingming 2018/02/08 下午16:31:16*/
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import Result from '../../components/AppMart/Order/result';


const OrderResult = ({ cloudState, dispatch }) => {
  const { payType } = cloudState.orderResult;
  const resultProps = {
    payType,
    onToApp() {
      dispatch(
        routerRedux.push('/system/app/myApp'),
      );
    },
    onView() {
      dispatch(
       routerRedux.push('/system/app/orderRecord'),
     );
    },
  };
  return (
    <div>
      <Result {...resultProps} />
    </div>
  );
};

OrderResult.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = cloudState => ({ cloudState });
export default connect(mapStateToProps)(OrderResult);

