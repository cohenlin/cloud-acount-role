/**
 * Created by xiaochenghua on 2018/02/06.
 */

import React, { PropTypes } from 'react';
import { connect } from 'dva/index';
import Header from '../../components/AppMart/Manage/header';
import Search from '../../components/AppMart/Manage/search';
import List from '../../components/AppMart/Manage/list';
import Modal from '../../components/AppMart/Manage/modal';


const manage = ({ dispatch, cloudState }) => {
  const {
    name,
    dataSource,
    listPagination,
    description,
    imgUrl,
    href,
    data,
    state,
    selectedItemsId,
    selectedItem,
    selectedStop,
    selectedStart,
    startFlag,
    stopFlag,
    localId,
    selectStatus,
    visible,
    shopList,
    btnRole,
  } = cloudState.manage;
  const headerProps = {
    description,
    imgUrl,
    href,
    data,
  };
  const searchProps = {
    state,
    name,
    startFlag,
    stopFlag,
    selectedItem,
    selectedStop,
    selectedStart,
    selectStatus,
    onSearchItem(e) {
      dispatch({
        type: 'manage/updateState',
        payload: {
          name: e.target.value,
        },
      });
    },
    onSearch() {
      dispatch({
        type: 'manage/queryShopList',
        payload: {
          name,
          status: selectStatus || '',
          appId: data[0].id,
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
          },
        },
      });
    },
    onSelectState(value) {
      dispatch({
        type: 'manage/updateState',
        payload: {
          selectStatus: value,
        },
      });
      dispatch({
        type: 'manage/queryShopList',
        payload: {
          name,
          status: value,
          appId: data[0].id,
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
          },
        },
      });
    },
    onStop() {
      const selectedItemsIds = selectedStop.join(',');
      dispatch({
        type: 'manage/changeStatus',
        payload: {
          ids: selectedItemsIds,
          status: '0',
        },
      });
      dispatch({
        type: 'manage/updateState',
        payload: {
          selectedItemsId: [],
          selectedItem: [],
          selectedStart: [],
          selectedStop: [],
          startFlag: true,
          stopFlag: true,
          btnRole: 0,
        },
      });
    },
    onStart() {
      const selectedItemsIds = selectedStart.join(',');
      dispatch({
        type: 'manage/changeStatus',
        payload: {
          ids: selectedItemsIds,
          status: '1',
        },
      });
      dispatch({
        type: 'manage/updateState',
        payload: {
          selectedItemsId: [],
          selectedItem: [],
          selectedStart: [],
          selectedStop: [],
          startFlag: true,
          stopFlag: true,
          btnRole: 1,
        },
      });
    },
  };
  const listProps = {
    dataSource,
    listPagination,
    selectedItemsId,
    onSelectItem(selectedRows, record) {
      const selectedArray = [];
      const selectedItemsIds = [];
      record.map((item) => {
        selectedArray.push({ id: item.id, status: item.status });
        selectedItemsIds.push(item.id);
        return null;
      });
      dispatch({
        type: 'manage/updateState',
        payload: {
          selectedItem: [...selectedItem, ...selectedArray],
          selectedItemsId: [...selectedItemsId, ...selectedItemsIds],
        },
      });
      dispatch({
        type: 'manage/editStatus',
      });
    },
    //  取消选择
    onDeleteItem(idArray) {
      const selectedItemsIds = []; // 删除后数组
      const checkedArray = []; // 去除后的状态数组
      const startArray = [];      // 上架按钮数组
      const stopArray = [];      //  下架按钮数组
      selectedItemsId.map((item) => {
        if (idArray.indexOf(item) < 0) {
          selectedItemsIds.push(item);
        }
        return null;
      });
      selectedItem.map((item) => {
        if (idArray.indexOf(item.id) < 0) {
          checkedArray.push(item);
        }
        return null;
      });
      const judgeStartArray = checkedArray.filter(item => item.status === 0);
      const judgeStopArray = checkedArray.filter(item => item.status === 1);
      const outTimeArray = checkedArray.filter(item => item.status === 2);

      judgeStartArray.map((item) => {
        startArray.push(item.id);
        return null;
      });
      judgeStopArray.map((item) => {
        stopArray.push(item.id);
        return null;
      });
      dispatch({
        type: 'manage/updateState',
        payload: {
          stopFlag: (judgeStartArray.length + outTimeArray.length) === checkedArray.length,
          startFlag: (judgeStopArray.length + outTimeArray.length) === checkedArray.length,
          selectedItem: checkedArray,
          selectedItemsId: selectedItemsIds,
          selectedStop: stopArray,
          selectedStart: startArray,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'manage/queryShopList',
        payload: {
          status: selectStatus,
          name,
          appId: localId,
          page: {
            pageno: page.current,
            rowcount: page.pageSize,
          },
        },
      });
    },
    onTitle(val) {
      return `此门店需要先上架${val.preApps.map(value => (` [ ${value} ] `))}${val.preApps.length}个应用才能上架此应用`;
    },
  };
  const modalProps = {
    visible,
    shopList,
    modalTitle: btnRole === 1 ? '上架' : '下架',
    onCancel() {
      dispatch({
        type: 'manage/hideModal',
      });
    },
  };
  return (
    <div>
      <Header {...headerProps} />
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
    </div>
  );
};

manage.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};
const mapStateToProps = cloudState => ({ cloudState });
export default connect(mapStateToProps)(manage);
