import React, { PropTypes } from 'react';
import { Modal, Table, Button } from 'antd';

const modal = ({
                 visible,
                 shopList,
                 modalTitle,
                 onCancel,
               }) => {
  const modalProps = {
    visible,
    title: `${modalTitle}操作失败`,
    onCancel,
    footer: <Button onClick={onCancel} type="primary" >确定</Button>,
    maskClosable: false,
  };
  const columns = [{
    title: '门店名称',
    dataIndex: 'shopName',
    key: 'shopName',
  }, {
    title: '失败原因',
    dataIndex: 'appsTitle',
    key: 'appsTitle',
  }];
  return (
    <Modal {...modalProps} >
      <Table
        dataSource={shopList}
        columns={columns}
        rowKey={value => value.shopName}
        pagination={false}
      />
    </Modal>
  );
};
modal.propTypes = {
  visible: PropTypes.bool,
  shopList: PropTypes.array,
  modalTitle: PropTypes.string,
  onCancel: PropTypes.func,
};

export default modal;
