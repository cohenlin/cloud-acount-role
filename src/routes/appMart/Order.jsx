/* CREATE BY yunbaoyuan 2018/02/02 下午13:26:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Item from '../../components/AppMart/Order/item';
import Modal from '../../components/common/Modal/shop';
// import { deleteArray, deleteCodes } from '../utils/index';

const Order = ({ cloudState, dispatch }) => {
  const {
    loading,
    appId,
    appInfos,
    shopIdArray,
    orderDuration,
    modalVisible,
    modalKey,
    modalError,
    modalErrorValue,
    treeShopData,
    treeShopOption,
    cacheCheckedKeys,
  } = cloudState.order;
  const itemProps = {
    loading,
    appInfos,
    orderDuration,
    cacheCheckedKeys,
    treeShopOption,
    treeShopData,
    onChooseShop() {
      dispatch({
        type: 'order/updateState',
        payload: {
          cacheCheckedKeys: treeShopOption.checkedKeys,
        },
      });
      dispatch({
        type: 'order/showModal',
      });
    },
    // 选择订购时常
    onChooseDuration(param) {
      dispatch({
        type: 'order/updateState',
        payload: {
          orderDuration: param,
        },
      });
    },
    // 新增订购
    onAdd(params) {
      dispatch({
        type: 'order/add',
        payload: {
          ...params,
          applicationId: appId,
          shopIds: shopIdArray,
        },
      });
    },
  };
  const modalProps = {
    loading,
    maskClosable: false,
    title: '选择门店',
    visible: modalVisible,
    modalErr: modalError,
    modalErrValue: modalErrorValue,
    treeShopData,
    treeShopOption,
    key: modalKey,
    onOk() {
      // 提取包含shopid键值中的shopid为数组
      const cacheShopIdArray = [];
      const cacheArray = treeShopOption.checkedKeys;
      cacheArray.map((item) => {
        cacheShopIdArray.push(item.split('&')[0]);
        return null;
      });
      dispatch({
        type: 'order/updateState',
        payload: {
          cacheCheckedKeys: treeShopOption.checkedKeys,
          shopIdArray: cacheShopIdArray,
        },
      });
      dispatch({
        type: 'order/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'order/hideModal',
      });
      dispatch({
        type: 'order/updateState',
        payload: {
          modalError: false,
          modalErrorValue: null,
          treeShopOption: {
            ...treeShopOption,
            checkedKeys: cacheCheckedKeys,
          },
        },
      });
    },
    onCheckShop(keys) {
      const cacheArray = keys.filter(item => item.includes('&'));
      dispatch({
        type: 'order/updateState',
        payload: {
          treeShopOption: {
            ...treeShopOption,
            checkedKeys: cacheArray,
            selectedKeys: keys,
          },
        },
      });
    },
    onTitle(item) {
      return (
        <p>此门店需先订购{item.preAppsName.map(val => (` [ ${val} ] `))}{item.preAppsName.length}个应用才能开通此应用。</p>);
    },
  };
  return (
    <div>
      <Item {...itemProps} />
      <Modal {...modalProps} />
    </div>
  );
};

Order.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Order);

