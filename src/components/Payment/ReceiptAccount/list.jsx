/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Table, Row, Col, Badge, Divider } from 'antd';
import { Link } from 'dva/router';

import { Payment } from '../../../utils/enums';

const { State } = Payment;

const list = ({ selectedRows, onSelect, onEidt, ...props }) => {
  const columns = [{
    title: '账户别名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '开通的支付渠道',
    dataIndex: 'channels',
    key: 'channels',
    render: (text, record) =>
      (record.channels && record.channels.length > 0 ?
        record.channels.map((it, index) => (
          <span style={{ color: 'rgb(148, 148, 148)' }} key={index}>&nbsp;{ it }&nbsp;</span>
        )) : <span>-</span>),
  }, {
    title: '绑定门店数',
    dataIndex: 'bindStoreNum',
    key: 'bindStoreNum',
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: (text) => {
      let statusTxt = '';
      if (text === State.ENABLE) {
        statusTxt = <Badge status="success" text="正常" />;
      } else if (text === State.DISABLED) {
        statusTxt = <Badge status="default" text="停用" />;
      }
      return statusTxt;
    },
  }, {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: (text, record) => (
      <span>
        <button className="btn-link" onClick={() => onEidt(record)}>编辑</button>
        <Divider type="vertical" />
        <Link to={`/system/set/receiptAccount/channel/${record.id}`}>配置</Link>
        {
          record.state === State.ENABLE &&
          <span>
            <Divider type="vertical" />
            <Link to={`/system/set/receiptAccount/shop/${record.id}`}>绑定门店管理</Link>
          </span>
        }
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
  onEidt: PropTypes.func,
};

export default list;
