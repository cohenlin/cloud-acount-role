/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Table, Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

const list = ({ selectedRows, onSelect, onUnbind, ...props }) => {
  const showConfirm = (record) => {
    confirm({
      title: '确定取消下列门店与该账号的绑定吗？',
      content: `${record.name}`,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        onUnbind(record);
      },
      onCancel() {},
    });
  };
  const columns = [{
    title: '门店',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: (text, record) => (
      <span>
        <button className="btn-link" onClick={() => showConfirm(record)}>取消绑定</button>
      </span>
    ),
  }];
  const rowSelection = {
    onChange: (selectedRowKeys, Rows) => {
      onSelect(Rows);
    },
    selectedRowKeys: selectedRows.map(item => item.id),
  };
  const tableProps = {
    rowKey: record => record.id,
    rowSelection,
    columns,
    ...props,
  };
  return (
    <div>
      <Row gutter={16} className="list">
        <Col span={24}>
          <Table
            bordered
            {...tableProps}
          />
        </Col>
      </Row>
    </div>);
};

list.propTypes = {
  selectedRows: PropTypes.array,
  onSelect: PropTypes.func,
  onUnbind: PropTypes.func,
};

export default list;
