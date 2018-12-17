/**
 * Create by liukang on 2018/03/06
 * */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import Search from '../../components/Payment/BindAccount/search';
import List from '../../components/Payment/BindAccount/list';

function BindAccount({ dispatch, bindAccount, loading }) {
  const {
    list,
    pagination,
    searchInfo,
    currentId,
    } = bindAccount;
  const searchProps = {
    searchInfo,
    // 搜索输入
    onSearchChange(e) {
      const value = e.target.value;
      dispatch({
        type: 'bindAccount/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    // 搜索按钮
    onSearch() {
      dispatch({
        type: 'bindAccount/query',
        payload: {
          current: 1,
          keyword: searchInfo,
        },
      });
    },
    // 清空搜索框
    onClearSearchInfo() {
      dispatch({
        type: 'bindAccount/updateState',
        payload: {
          searchInfo: '',
        },
      });
      dispatch({
        type: 'bindAccount/query',
        payload: {
          current: 1,
          keyword: '',
        },
      });
    },
  };
  const listProps = {
    dataSource: list,
    pagination,
    currentId,
    loading: loading.models.bindAccount,
    // table复选框
    onSelect(e) {
      const value = e.target.value;
      dispatch({
        type: 'bindAccount/updateState',
        payload: {
          currentId: value,
        },
      });
    },
    // 分页变更
    onChange({ current, pageSize }) {
      dispatch({
        type: 'bindAccount/query',
        payload: {
          current,
          size: pageSize,
          keyword: searchInfo,
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
}

BindAccount.propTypes = {
  dispatch: PropTypes.func,
  bindAccount: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ bindAccount, loading }) =>
  ({ bindAccount, loading }))(BindAccount);
