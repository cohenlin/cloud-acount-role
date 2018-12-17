/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Table, Row, Col, Icon } from 'antd';
import styles from './index.less';
import { Payment } from '../../../utils/enums';

const { State } = Payment;

const list = ({ onEidt, ...props }) => {
  const columns = [{
    title: '第三方渠道',
    dataIndex: 'channelName',
    key: 'channelName',
  }, {
    title: '状态',
    dataIndex: 'isConfigre',
    key: 'isConfigre',
    render: (text) => {
      let statusTxt = '';
      if (text === State.ENABLE) {
        statusTxt = <span className={styles.config}><Icon className={styles.configured} type="check-circle" />&nbsp;&nbsp;<span className={styles.text}>已配置</span></span>;
      } else if (text === State.DISABLED) {
        statusTxt = <span className={styles.config}><Icon className={styles.unconfigured} type="minus-circle" />&nbsp;&nbsp;<span className={styles.text}>未配置</span></span>;
      }
      return statusTxt;
    },
  }, {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: (text, record) => (
      <span>
        <button className="btn-link" onClick={() => onEidt(record)}>配置</button>
      </span>
    ),
  }];
  const tableProps = {
    pagination: false,
    rowKey: record => record.id,
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
  onEidt: PropTypes.func,
};

export default list;
