import React, { PropTypes } from 'react';
import { Table, Row, Col, Badge } from 'antd';

const list = ({
   onEdit,
   loading,
   postList,
   postButton,
   listPagination,
   onSelectPost,
   onDelectPost,
   onChangeSorter,
   checkedPostId,
}) => {
  const disabled = postButton && postButton.edit;
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
        onDelectPost([record.id]);
      } else {
        onSelectPost(selectedRows, [{ id: record.id, status: record.status }]);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const changeRowsIds = [];
      changeRows.map((item) => {
        changeRowsIds.push(item.id);
        return null;
      });
      if (!selected) {
        onDelectPost(changeRowsIds);
      } else {
        onSelectPost(selectedRows, changeRows);
      }
    },
    selectedRowKeys: checkedPostId, // 根据数组中的id，确认列表中的选中状态
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
          onChange={onChangeSorter}
        />
      </Col>
    </Row>
  </div>);
};
list.propTypes = {
  loading: PropTypes.bool,
  postList: PropTypes.array,
  listPagination: PropTypes.object,
  postButton: PropTypes.object,
  onEdit: PropTypes.func,
  checkedPostId: PropTypes.array,
  onChangeSorter: PropTypes.func,
  onSelectPost: PropTypes.func,
  onDelectPost: PropTypes.func,
};

export default list;
