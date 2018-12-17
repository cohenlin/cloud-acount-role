/**
 * Create by liukang on 2018/03/06
 * */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Search from '../../components/Payment/ReceiptShop/search';
import List from '../../components/Payment/ReceiptShop/list';
import Modal from '../../components/Payment/ReceiptShop/modal';

function ReceiptShop({ dispatch, receiptShop, loading }) {
  const {
    list,
    pagination,
    selectedRows,
    searchInfo,
    modalVisible,
    modalKey,
    shopData,
    checkedShopIds,
    checkedShops,
    } = receiptShop;
  const searchProps = {
    searchInfo,
    selectedRows,
    // 绑定门店
    onAdd() {
      dispatch({
        type: 'receiptShop/queryStores',
      });
    },
    // 后退
    onBack() {
      dispatch(
        routerRedux.push('/system/set/receiptAccount'),
      );
    },
    // 批量解绑
    onUnbind() {
      dispatch({
        type: 'receiptShop/unbindAll',
        payload: selectedRows.map(it => it.id),
      });
    },
    // 搜索输入
    onSearchChange(e) {
      const value = e.target.value;
      dispatch({
        type: 'receiptShop/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    // 搜索按钮
    onSearch() {
      dispatch({
        type: 'receiptShop/query',
        payload: {
          current: 1,
          keyword: searchInfo,
        },
      });
    },
    // 清空搜索框
    onClearSearchInfo() {
      dispatch({
        type: 'receiptShop/updateState',
        payload: {
          searchInfo: '',
        },
      });
      dispatch({
        type: 'receiptShop/query',
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
    selectedRows,
    loading: loading.models.receiptShop,
    // 解绑
    onUnbind(rows) {
      dispatch({
        type: 'receiptShop/unbind',
        payload: {
          id: rows.id,
        },
      });
    },
    // table复选框
    onSelect(rows) {
      dispatch({
        type: 'receiptShop/updateState',
        payload: {
          selectedRows: rows,
        },
      });
    },
    onChange({ current, pageSize }) {
      dispatch({
        type: 'receiptShop/query',
        payload: {
          current,
          size: pageSize,
          keyword: searchInfo,
        },
      });
    },
  };
  const modalProps = {
    key: modalKey,
    visible: modalVisible,
    shopData,
    checkedShopIds,
    onConfirm() {
      const shops = checkedShops
        .filter(it => it.isLeaf === 1)
        .map(it => ({
          code: it.bohCode,
          name: it.name,
        }));
      console.log(shops);
      dispatch({
        type: 'receiptShop/bind',
        payload: shops,
      });
    },
    onCancel() {
      dispatch({
        type: 'receiptShop/hideModal',
      });
    },
    // 选择门店
    onCheckedShop(keys, e) {
      const shops = e.checkedNodes.map(item => item.props.dataRef);
      dispatch({
        type: 'receiptShop/updateState',
        payload: {
          checkedShopIds: keys,
          checkedShops: shops,
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
    </div>
  );
}

ReceiptShop.propTypes = {
  dispatch: PropTypes.func,
  receiptShop: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ receiptShop, loading }) =>
  ({ receiptShop, loading }))(ReceiptShop);
