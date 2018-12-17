import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import List from '../../components/AppMart/MyApp/list';

const MyApp = ({ dispatch, cloudState }) => {
  const { listData, listPagination } = cloudState.myApp;
  const listProps = {
    listData,
    listPagination,
    onPageChange(page, pageSize) {
      dispatch({
        type: 'myApp/query',
        payload: {
          page: {
            pageno: page,
            rowcount: pageSize,
          },
        },
      });
      dispatch({
        type: 'myApp/updateState',
        payload: {
          page: {
            current: page,
            pageSize,
          },
        },
      });
    },
    // 点击“管理”按钮，跳转到管理应用页面
    onEdit(appId) {
      dispatch(
        routerRedux.push(`/system/app/manage/${appId}`),
      );
    },
    // 点击“进入应用”按钮，跳转到扫码点餐页面
    onView() {},
  };

  return (
    <List {...listProps} />
  );
};

MyApp.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(MyApp);
