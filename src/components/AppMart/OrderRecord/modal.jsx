/**
 * Created by Wangtaidong on 2018/2/2.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, List, Table, Avatar } from 'antd';

const modal = ({ modalData, listData, onConfirm, ...modalProps, pageModal, onPage }) => {
  const columns = [
    {
      title: '订购门店',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '门店地址',
      dataIndex: 'shopAddress',
      key: 'shopAddress',
      render: (text, record) => `${record.province}${record.city}${record.district}${record.address}`,
    },
  ];
  return (
    <Modal {...modalProps}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ width: 94, height: 94 }} src={item.applicationIcon} />}
              title={item.applicationName}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <Table
        columns={columns}
        dataSource={modalData}
        pagination={pageModal}
        rowKey={record => record.id}
        onChange={onPage}
      />
      <Button
        type="primary"
        onClick={onConfirm}
        style={{ position: 'relative', left: '92%', bottom: -14 }}
      >
        确定
      </Button>
    </Modal>
  );
};
modal.propTypes = {
  modalData: PropTypes.array,
  listData: PropTypes.array,
  onConfirm: PropTypes.func,
  modalProps: PropTypes.object,
  pageModal: PropTypes.object,
  onPage: PropTypes.func,
};

export default modal;
