/**
 * Create by liukang on 2018/03/06
 * */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Payment } from '../../utils/enums';

import Search from '../../components/Payment/ReceiptAccount/search';
import List from '../../components/Payment/ReceiptAccount/list';
import Modal from '../../components/Payment/ReceiptAccount/modal';

const { State } = Payment;

function ReceiptAccount({ dispatch, receiptAccount, loading }) {
  const {
    list,
    pagination,
    selectedRows,
    selectedStarts,
    selectedBlocks,
    startBtnStatus,
    blockBtnStatus,
    deleteBtnStatus,
    searchInfo,
    modalVisible,
    item,
    modalKey,
    } = receiptAccount;
  const searchProps = {
    searchInfo,
    selectedRows,
    startBtnStatus,
    blockBtnStatus,
    deleteBtnStatus,
    selectedStarts,
    selectedBlocks,
    // 添加
    onAdd() {
      dispatch({
        type: 'receiptAccount/showModal',
        payload: {
          item: {},
        },
      });
    },
    // 删除
    onDelete() {
      dispatch({
        type: 'receiptAccount/delete',
        payload: selectedRows.map(it => it.id),
      });
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          selectedRows: [],
          selectedStarts: [],
          selectedBlocks: [],
          startBtnStatus: true,
          blockBtnStatus: true,
          deleteBtnStatus: true,
        },
      });
    },
    // 停用
    onBlock() {
      dispatch({
        type: 'receiptAccount/onOff',
        payload: {
          enable: State.DISABLED,
          ids: selectedStarts.map(it => it.id),
        },
      });
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          selectedRows: [],
          selectedStarts: [],
          selectedBlocks: [],
          startBtnStatus: true,
          blockBtnStatus: true,
          deleteBtnStatus: true,
        },
      });
    },
    // 启用
    onStart() {
      dispatch({
        type: 'receiptAccount/onOff',
        payload: {
          enable: State.ENABLE,
          ids: selectedBlocks.map(it => it.id),
        },
      });
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          selectedRows: [],
          selectedStarts: [],
          selectedBlocks: [],
          startBtnStatus: true,
          blockBtnStatus: true,
          deleteBtnStatus: true,
        },
      });
    },
    // 搜索输入
    onSearchChange(e) {
      const value = e.target.value;
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    // 搜索按钮
    onSearch() {
      dispatch({
        type: 'receiptAccount/query',
        payload: {
          current: 1,
          keyword: searchInfo,
        },
      });
    },
    // 清空搜索框
    onClearSearchInfo() {
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          searchInfo: '',
        },
      });
      dispatch({
        type: 'receiptAccount/query',
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
    loading: loading.models.receiptAccount,
    // 编辑
    onEidt(rows) {
      dispatch({
        type: 'receiptAccount/showModal',
        payload: {
          item: rows,
        },
      });
    },
    // table复选框
    onSelect(rows) {
      const starts = rows.filter(item1 => item1.state === '1');
      const blocks = rows.filter(item1 => item1.state === '0');
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          selectedRows: rows,
        },
      });
      dispatch({
        type: 'receiptAccount/updateState',
        payload: {
          selectedStarts: starts,
          selectedBlocks: blocks,
          startBtnStatus: !blocks.length,
          blockBtnStatus: !starts.length,
          deleteBtnStatus: !rows.length,
        },
      });
    },

    // 分页变更
    onChange({ current, pageSize }) {
      dispatch({
        type: 'receiptAccount/query',
        payload: {
          current,
          size: pageSize,
          keyword: searchInfo,
        },
      });
    },
  };
  const modalProps = {
    item,
    key: modalKey,
    visible: modalVisible,
    onConfirm(type, data) {
      if (type === 'add') {
        dispatch({
          type: 'receiptAccount/add',
          payload: data,
        });
      }
      if (type === 'edit') {
        dispatch({
          type: 'receiptAccount/edit',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'receiptAccount/hideModal',
        payload: {
          modalVisiable: false,
          item: {},
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

ReceiptAccount.propTypes = {
  dispatch: PropTypes.func,
  receiptAccount: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ receiptAccount, loading }) =>
  ({ receiptAccount, loading }))(ReceiptAccount);
