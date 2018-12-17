/**
 * Created by Wangtaidong on 2017/12/21.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Search from '../../components/System/Organization/search';
import List from '../../components/System/Organization/list';
import Modal from '../../components/System/Organization/modal';

const Organization = ({ dispatch, cloudState }) => {
  const {
    treeDate,
    shopList,
    visible,
    currentItem,
    loading,
    pagination,
    searchId,
    searchName,
  } = cloudState.organization;
  const searchProps = {
    searchName,
    treeDate,
    onChangeId(selectedKeys) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          searchId: selectedKeys,
        },
      });
      dispatch({
        type: 'organization/queryShop',
        payload: {
          id: selectedKeys.join(','),
          name: searchName,
        },
      });
    },
    onChangeName(e) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          searchName: e.target.value,
        },
      });
    },
    onSubmit() {
      dispatch({
        type: 'organization/queryShop',
        payload: {
          name: searchName,
          id: searchId.join(','),
        },
      });
    },
  };
  const listProps = {
    loading,
    shopList,
    pagination,
    onEdit(row) {
      dispatch({
        type: 'organization/showModal',
      });
      dispatch({
        type: 'organization/updateState',
        payload: {
          currentItem: row,
        },
      });
      // 请求账户
      dispatch({
        type: 'bindAccount/updateItem',
        payload: {
          item: row,
        },
      });
    },
    onPage(page) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          pagination: page,
        },
      });
      dispatch({
        type: 'organization/queryShop',
        payload: {
          id: searchId.join(','),
          name: searchName,
          page: {
            pageno: page.current,
            rowcount: page.pageSize,
          },
        },
      });
    },
  };

  const modalProps = {
    currentItem,
    visible,
    onConfirm() {
      dispatch({
        type: 'bindAccount/bind',
      });
    },
    onCancel() {
      dispatch({
        type: 'organization/hideModal',
      });
    },
  };

  return (
    <div id="authority">
      <Search {...searchProps} />
      <List {...listProps} />
      { visible && <Modal {...modalProps} /> }
    </div>
  );
};

Organization.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Organization);
