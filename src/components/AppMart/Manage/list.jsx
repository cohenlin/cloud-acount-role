/**
 * Created by xiaochenghua on 2018/02/06.
 */
import React, { PropTypes } from 'react';
import Moment from 'moment';
import { Table, Tooltip, Icon } from 'antd';

const list = ({
    dataSource,
    listPagination,
    onSelectItem,
    onDeleteItem,
    selectedItemsId,
    onPageChange,
    onTitle,
  }) => {
  const columns = [{
    title: null,
    dataIndex: null,
    key: 'tip',
    width: 8,
    render: val => (val.preApps.length > 0 ? <Tooltip placeMent="right" title={onTitle(val)} ><Icon type="exclamation-circle" /></Tooltip> : null),
  }, {
    title: '门店名称/ID',
    dataIndex: 'shopName',
    key: 'shopName',
    render: text => <div style={{ textAlign: 'left' }}>
      <p style={{ marginBottom: 0 }}>{text[0]}</p>
      <p style={{ marginBottom: 0 }}>{text[1]}</p>
    </div>,
  }, {
    title: '门店地址',
    dataIndex: 'shopAddress',
    key: 'shopAddress',
  }, {
    title: '到期时间',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (deadline) => {
      let resultTime;
      const y = Moment(deadline).format('YYYY');
      if (y === '9999') {
        resultTime = '永久';
      } else {
        resultTime = Moment(deadline).format('YYYY-MM-DD HH:mm:ss');
      }
      return resultTime;
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      switch (status) {
        case 0:
          return '未上架';
        case 1:
          return '已上架';
        default:
          return '已过期';
      }
    },
  }];
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        onSelectItem(selectedRows, [{ id: record.id, status: record.status }]);
      } else {
        onDeleteItem([record.id]);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const changeRowsIds = [];
      changeRows.map((item) => {
        changeRowsIds.push(item.id);
        return null;
      });
      changeRows.filter(e => e.status === 1);
      if (selected) {
        onSelectItem(selectedRows, changeRows);
      } else {
        onDeleteItem(changeRowsIds);
      }
    },
    getCheckboxProps: record =>
      ({ disabled: record.status === 2 || record.preApps.length > 0 }),
    selectedRowKeys: selectedItemsId,
  };
  return (
    <div>
      <Table
        rowKey={item => item.id}
        dataSource={dataSource}
        rowSelection={rowSelection}
        columns={columns}
        pagination={listPagination}
        style={{ marginTop: 10 }}
        onChange={e => onPageChange(e)}
      />
    </div>
  );
};

list.propTypes = {
  dataSource: PropTypes.array,
  listPagination: PropTypes.object,
  onSelectItem: PropTypes.func,
  selectedItemsId: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onPageChange: PropTypes.func,
  onTitle: PropTypes.func,
};

export default list;
