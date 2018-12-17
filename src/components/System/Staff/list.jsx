import React, { PropTypes } from 'react';
import { Table, Row, Col, Badge } from 'antd';

const list = ({
   loading,
   staffButton,
   staffList,
   checkedStaffId,
   onEdit,
   onSelectStaff,
   listPagination,
   onChangeSorter,
   onDelectStaff,
  }) => {
  const disabled = staffButton && staffButton.edit;
  const columns = [{
    title: '员工姓名',
    dataIndex: 'realname',
    key: 'realname',
  }, {
    title: '隶属机构',
    dataIndex: 'storeName',
    key: 'storeName',
    render: text => (text ? `${text}` : '无'),
  }, {
    title: '手机帐号',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '权限组',
    dataIndex: 'post',
    key: 'post',
  }, {
    title: <span title="所管理的门店数量">有权限门店</span>,
    dataIndex: 'authStoresNum',
    key: 'authStoresNum',
    render: text => `${text}家`,
  }, {
    title: '注册状态',
    dataIndex: 'issigned',
    key: 'issigned',
    render: (text) => {
      const badgeProps = {
        status: text === '1' ? 'success' : 'default',
        text: text === '1' ? '已注册' : '未注册',
      };
      return (<Badge {...badgeProps} />);
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      const badgeProps = {
        status: text === 1 ? 'success' : 'default',
        text: text === 1 ? '正常' : '停用',
      };
      return (<Badge {...badgeProps} />);
    },
  }, {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: (text, record) => (
      <span>
        { disabled && <button className="btn-link" onClick={() => onEdit(record)}>编辑</button> }
        { !disabled && <span>编辑</span> }
      </span>
    ),
  }];
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      if (!selected) {
        onDelectStaff([record.id]);
      } else {
        onSelectStaff(selectedRows, [{ id: record.id, status: record.status }]);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const changeRowsIds = [];
      changeRows.map((item) => {
        changeRowsIds.push(item.id);
        return null;
      });
      if (!selected) {
        onDelectStaff(changeRowsIds);
      } else {
        onSelectStaff(selectedRows, changeRows);
      }
    },
    selectedRowKeys: checkedStaffId,
  };
  return (<div>
    <Row gutter={16}>
      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={staffList}
          pagination={listPagination}
          bordered
          rowSelection={rowSelection}
          rowKey={record => record.id}
          onChange={onChangeSorter}
        />
      </Col>
    </Row>
  </div>);
};
list.propTypes = {
  onEdit: PropTypes.func,
  staffButton: PropTypes.object,
  staffList: PropTypes.array,
  checkedStaffId: PropTypes.array,
  onChangeSorter: PropTypes.func,
  onSelectStaff: PropTypes.func,
  listPagination: PropTypes.object,
  loading: PropTypes.bool,
  onDelectStaff: PropTypes.func,
};

export default list;
