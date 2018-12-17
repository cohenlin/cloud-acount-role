import React, { PropTypes } from 'react';
import { Table, Spin, Icon } from 'antd';

const List = ({
                onEdit,
                onPage,
                loading,
                shopList,
                pagination,
              }) => {
  const columns = [
    {
      title: '门店',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '第三方门店绑定',
      dataIndex: 'isMeiweiOrShop',
      key: 'isMeiweiOrShop',
      render: text => (text ? (text.map((item) => {
        let third = '';
        if (item) {
          switch (item) {
            case 'isMeiWei':
              third = '美味';
              break;
            case 'isShopId':
              third = '口碑';
              break;
            default:
              third = '';
          }
        }
        return (third ? <span key={third}><Icon type="check-circle" style={{ color: '#52c41a' }} /> {third} </span> : null);
      })) : null),
    }, {
      title: '收款账户',
      dataIndex: 'accountName',
      key: 'accountName',
    }, {
      title: '操作',
      key: 'opration',
      render: (text, record) => <button className="btn-link" onClick={() => onEdit(record)}>编辑收款账户</button>,
    },
  ];
  const tableProps = {
    className: 'list',
    columns,
    dataSource: shopList,
    rowKey: record => record.id,
    pagination,
    loading,
  };
  return (!loading ?
    <div style={{ marginTop: '-4px' }}>
      <Table
        {...tableProps}
        onChange={(page, filters, sorter) => onPage(page, filters, sorter)}
        bordered
      />
    </div> : <div style={{ textAlign: 'center' }}><Spin /></div >
  );
};

List.propTypes = {
  onEdit: PropTypes.func,
  onPage: PropTypes.func,
  loading: PropTypes.bool,
  shopList: PropTypes.array,
  pagination: PropTypes.object,
};

export default List;
