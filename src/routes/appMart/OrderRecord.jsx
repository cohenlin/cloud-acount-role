/**
 * Created by Wangtaidong on 2018/2/1.
 */
import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Modal } from 'antd';
import List from '../../components/AppMart/OrderRecord/list';
import Search from '../../components/AppMart/OrderRecord/search';
import ViewModal from '../../components/AppMart/OrderRecord/modal';

const confirm = Modal.confirm;
const OrderRecord = ({ dispatch, cloudState }) => {
  const {
    loading,
    apps,
    selectAppId,
    selectStatus,
    list,
    pagination,
    visible,
    modalData,
    listData,
    orderId,
    tenantId,
    pageModal,
  } = cloudState.orderRecord;
  // 从所有应用中根据applicationId查找applicationName
  const mapList = (listItems, appItems) => {
    listItems.map((listItem) => {
      if (listItem) {
        const item = listItem;
        item.createTime = Moment(listItem.createTime).format('YYYY-MM-DD HH:mm:ss');
        appItems.map((appItem) => {
          if (appItem) {
            if (appItem.id === item.applicationId) {
              item.applicationName = appItem.applicationName;
              item.applicationIcon = appItem.applicationIcon;
              item.description = appItem.description;
            }
          }
          return false;
        });
      }
      return false;
    });
  };
  mapList(list, apps);

  const searchProps = {
    apps,
    // 选择应用
    onSelectApp(value) {
      dispatch({
        type: 'orderRecord/query',
        payload: {
          page: {
            pageno: 1,
            rowcount: 10,
          },
          applicationId: value,
          status: selectStatus,
        },
      });
      dispatch({
        type: 'orderRecord/updateState',
        payload: {
          selectAppId: value,
        },
      });
    },
    // 选择状态
    onSelectStatus(value) {
      dispatch({
        type: 'orderRecord/query',
        payload: {
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
          },
          applicationId: selectAppId,
          status: value,
        },
      });
      dispatch({
        type: 'orderRecord/updateState',
        payload: {
          selectStatus: value,
        },
      });
    },
  };
  const listProps = {
    loading,
    dataSource: list,
    pagination,
    // 查看门店
    onView(record) {
      dispatch({ type: 'orderRecord/showModal' });
      dispatch({
        type: 'orderRecord/updateState',
        payload: {
          listData: [
            {
              applicationName: record.applicationName,
              applicationIcon: record.applicationIcon,
              description: record.description,
            },
          ],
          orderId: record.id,
          tenantId: record.tenantId,
        },
      });
      dispatch({   // 请求门店
        type: 'orderRecord/queryShops',
        payload: {
          orderId: record.id,
          tenantId: record.tenantId,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'orderRecord/query',
        payload: {
          page: {
            pageno: page.current, // 查看第几页内容 默认1
            rowcount: page.pageSize, // 一页展示条数 默认10
          },
          applicationId: selectAppId,
          status: selectStatus,
        },
      });
    },
    onReview(e, record) {
      confirm({
        title: '确认',
        content: '确定取消订单？',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          dispatch({
            type: 'orderRecord/cancel',
            payload: {
              orderApplicationId: record.id,
            },
          });
        },
        onCancel() {},
      });
    },
  };
  const modalProps = {
    visible,
    title: '订购门店详情',
    width: 780,
    footer: null,
    maskClosable: false,
    modalData,
    listData,
    pageModal,
    onCancel() {
      dispatch({
        type: 'orderRecord/hideModal',
      });
      dispatch({
        type: 'orderRecord/hideLoading',
      });
    },
    onConfirm() {
      dispatch({
        type: 'orderRecord/hideModal',
      });
      dispatch({
        type: 'orderRecord/hideLoading',
      });
    },
    onPage(page) {
      dispatch({
        type: 'orderRecord/queryShops',
        payload: {
          orderId,
          tenantId,
          page: {
            pageno: page.current, // 查看第几页内容 默认1
            rowcount: page.pageSize, // 一页展示条数 默认10
          },
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <ViewModal {...modalProps} />
    </div>
  );
};

OrderRecord.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};
const mapStateToProps = cloudState => ({ cloudState });
export default connect(mapStateToProps)(OrderRecord);
