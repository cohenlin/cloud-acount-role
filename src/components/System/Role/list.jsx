import React, { PropTypes } from 'react';
import { Table, Row, Col, Badge } from 'antd';

const list = ({
   onEdit,
   loading,
   postList,
   roleButton,
   listPagination,
   rowSelection,
   checkedPostId,
}) => {
  const disabled = roleButton && roleButton.edit;
  const columns = [{
    title: '角色名称',
    dataIndex: 'postName',
    key: 'postName',
  }, {
    title: '所含员工数',
    dataIndex: 'userCount',
    key: 'userCount',
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
    selectedRowKeys: checkedPostId,
  };

  return (<div>
    <Row gutter={16}>
      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={postList}
          pagination={listPagination}
          bordered
          rowKey={record => record.id}
          rowSelection={rowSelection}
        />
      </Col>
    </Row>
  </div>);
};
list.propTypes = {
  loading: PropTypes.bool,
  postList: PropTypes.array,
  listPagination: PropTypes.object,
  roleButton: PropTypes.object,
  onEdit: PropTypes.func,
  rowSelection: PropTypes.object,
  checkedPostId: PropTypes.array,
};

export default list;
