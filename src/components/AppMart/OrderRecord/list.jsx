/**
 * Created by Wangtaidong on 2018/2/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';

const secondRowColor = '#807d78';
const List = ({ loading,
                dataSource,
                pagination,
                onView,
                onPageChange,
                onReview,
              }) => {
  const columns = [{
    title: <div>
      <p>订单信息</p>
      <p style={{ color: secondRowColor }}>编号|时间</p>
    </div>,
    dataIndex: 'orderInfo',
    key: 'orderInfo',
    render: (text, record) => (
      <div style={{ textAlign: 'left' }}>
        <p style={{ marginBottom: 0 }}>{record.orderCode}</p>
        <p style={{ marginBottom: 0, color: secondRowColor }}>{record.createTime}</p>
      </div>),
  }, {
    title: '服务名称',
    dataIndex: 'applicationName',
    key: 'applicationName',
  }, {
    title: <div style={{ textAlign: 'left' }}>
      <p>订购人信息</p>
      <p style={{ color: secondRowColor }}>姓名</p>
    </div>,
    dataIndex: 'tenantName',
    key: 'tenantName',
  }, {
    title: <div>
      <p>联系人信息</p>
      <p style={{ color: secondRowColor }}>姓名|手机</p>
    </div>,
    dataIndex: 'connectInfo',
    key: 'connectInfo',
    render: (text, record) => (
      <div style={{ textAlign: 'left' }}>
        <p style={{ marginBottom: 0 }}>{record.connectName}</p>
        <p style={{ marginBottom: 0, color: secondRowColor }}>{record.connectMobile}</p>
      </div>
    ),
  }, {
    title: <div>
      <p>订购信息</p>
      <p style={{ color: secondRowColor }}>周期</p>
    </div>,
    dataIndex: 'period',
    key: 'period',
    render: (text, record) => {
      if (record.period === -1) {
        return (
          <p>永久</p>
        );
      } else if (record.namt === 0) {
        return (
          <p>{record.period}天</p>
        );
      } else if (record.namt !== 0) {
        return (<p>{record.period / 30}个月</p>);
      }
      return true;
    },
  }, {
    title: '门店数',
    dataIndex: 'shop',
    key: 'shop',
    width: 78,
    render: (text, record) => (
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: 2 }}>{record.shopCount}</p>
        <p style={{ marginBottom: 0 }}>
          <span>
            <button className="btn-link" onClick={() => onView(record)}>查看</button>
          </span>
        </p>
      </div>
    ),
  }, {
    title: '订单总价',
    dataIndex: 'namt',
    key: 'namt',
    render: (text) => {
      if (text === -1) {
        return '面议';
      } else if (text === 0) {
        return '免费';
      } else if (text === -2) {
        return 0;
      }
      return text;
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      let statusText = '';
      if (text === 0) {
        statusText = <Tag color="volcano">待处理</Tag>;
      } else if (text === 1) {
        statusText = <Tag color="green">已生效</Tag>;
      } else if (text === 2) {
        statusText = <Tag color="blue">已取消</Tag>;
      } else if (text === 3) {
        statusText = <Tag color="cyan">未通过</Tag>;
      }
      return statusText;
    },
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      if (record.status === 0) {
        return (
          <span>
            <button className="btn-link" onClick={(e) => { onReview(e, record); }}>取消订单</button>
          </span>
        );
      }
      return ('---');
    },
  }];
  return (
    <div>
      <Table
        columns={columns}
        bordered
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.orderCode}
        onChange={onPageChange}
        scroll={{ x: 1060 }}
      />
    </div>
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onReview: PropTypes.func,
  onView: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default List;
