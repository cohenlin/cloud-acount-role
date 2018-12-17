import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Search from '../../components/AppMart/Market/search';
import List from '../../components/AppMart/Market/list';

const Market = ({ dispatch, cloudState }) => {
  const { listData, listPagination, searchInfo } = cloudState.market;
  const listProps = {
    listData,
    listPagination,
    onPageChange(page, pageSize) { // 切换分页
      dispatch({
        type: 'market/query',
        payload: {
          page: {
            pageno: page,
            rowcount: pageSize,
          },
          name: searchInfo,
        },
      });
      dispatch({
        type: 'market/updateState',
        payload: {
          page: {
            current: page,
            pageSize,
          },
        },
      });
    },
    onOrder(appId) { // 点击“订购”按钮，跳转到订购应用页面
      dispatch(
       routerRedux.push(`/system/app/order/${appId}`),
      );
    },
  };
  const searchProps = {
    searchInfo,
    onSearch() {
      dispatch({
        type: 'market/query',
        payload: {
          name: searchInfo,
        },
      });
    },
    // 搜索输入
    onSearchChange(e) {
      const value = e.target.value;
      dispatch({
        type: 'market/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    // 清空搜索框
    onClearSearchInfo() {
      dispatch({
        type: 'market/updateState',
        payload: {
          searchInfo: '',
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
    </div>
  );
};

Market.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Market);
