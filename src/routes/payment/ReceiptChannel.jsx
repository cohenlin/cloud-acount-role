/**
 * Create by liukang on 2018/03/06
 * */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Search from '../../components/Payment/ReceiptChannel/search';
import List from '../../components/Payment/ReceiptChannel/list';
import Modal from '../../components/Payment/ReceiptChannel/modal';
import ChannelModal from '../../components/Payment/ReceiptChannel/channelmModal';

function ReceiptAccount({ dispatch, receiptChannel, loading }) {
  const {
    list,
    selectedRows,
    searchInfo,
    modalVisible,
    item,
    modalKey,
    channelModalVisible,
    channelModalKey,
    channel,
    selectedChannel,
    aggregator,
    isv,
    } = receiptChannel;
  const searchProps = {
    // 编辑开通渠道
    onEdit() {
      dispatch({
        type: 'receiptChannel/queryChannel',
      });
    },
    // 后退
    onBack() {
      dispatch(
        routerRedux.push('/system/set/receiptAccount'),
      );
    },
  };
  const listProps = {
    dataSource: list,
    selectedRows,
    loading: loading.models.receiptChannel,
    // 编辑
    onEidt(rows) {
      dispatch({
        type: 'receiptChannel/queryConfigure',
        payload: {
          id: rows.id,
        },
      });
    },
    // 变更页码
    onChange({ current, pageSize }) {
      dispatch({
        type: 'receiptChannel/query',
        payload: {
          current,
          size: pageSize,
          keyword: searchInfo,
        },
      });
    },
  };
  const modalProps = {
    aggregator,
    isv,
    item,
    key: modalKey,
    visible: modalVisible,
    onConfirm(type, data) {
      if (type === 'edit') {
        dispatch({
          type: 'receiptChannel/edit',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'receiptChannel/hideModal',
        payload: {
          modalVisiable: false,
          item: {},
        },
      });
    },
    // 表单变更
    onItemChange(e, key) {
      dispatch({
        type: 'receiptChannel/updateState',
        payload: {
          item: {
            ...item,
            [key]: e,
          },
        },
      });
    },
  };
  const channelModalProps = {
    item,
    channel,
    selectedChannel,
    key: channelModalKey,
    visible: channelModalVisible,
    onConfirm() {
      dispatch({
        type: 'receiptChannel/editChannel',
        payload: selectedChannel,
      });
    },
    onCancel() {
      dispatch({
        type: 'receiptChannel/hideModalChannel',
      });
    },
    // 渠道变更
    onChannelChange(e) {
      dispatch({
        type: 'receiptChannel/updateState',
        payload: {
          selectedChannel: e,
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
      <ChannelModal {...channelModalProps} />
    </div>
  );
}

ReceiptAccount.propTypes = {
  dispatch: PropTypes.func,
  receiptChannel: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ receiptChannel, loading }) =>
  ({ receiptChannel, loading }))(ReceiptAccount);
