/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Table, Row, Col, Radio } from 'antd';

const RadioGroup = Radio.Group;

const list = ({ onSelect, currentId, ...props }) => {
  const columns = [{
    title: '收款账号',
    dataIndex: 'name',
    key: 'name',
    render: (text, row) => (<Radio value={row.id}>{text}</Radio>),
  }];
  const tableProps = {
    rowKey: record => record.id,
    columns,
    ...props,
  };
  return (
    <div>
      <Row gutter={24} className="list">
        <Col span={24}>
          <RadioGroup onChange={onSelect} value={currentId} style={{ width: '100%' }}>
            <Table
              bordered
              {...tableProps}
            />
          </RadioGroup>
        </Col>
      </Row>
    </div>);
};

list.propTypes = {
  currentId: PropTypes.string,
  onSelect: PropTypes.func,
  onEidt: PropTypes.func,
};

export default list;
