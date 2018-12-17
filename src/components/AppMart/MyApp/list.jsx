import React, { PropTypes } from 'react';
import { List, Button, Pagination, Row, Col } from 'antd';

import styles from './index.less';

const list = ({ listData, listPagination, onPageChange, onEdit, onView }) => {
  const enterButton = <Button type="primary" ghost onClick={onView}>进入应用</Button>;
  return (
    <div className={styles.appList}>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={item => (
          <List.Item actions={[item.redirectUrl ? enterButton : '']}>
            <List.Item.Meta
              avatar={
                <img
                  src={item.applicationIcon}
                  alt={item.applicationName}
                  className="logo"
                />
              }
              title={item.applicationName}
              description={
                <Row type="flex">
                  <Col span={20}>
                    <p className="cont">{item.description}</p>
                    <button className="btn-link" type="button" onClick={() => onEdit(item.id)}>管理</button>
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        style={{ textAlign: 'right' }}
        {...listPagination}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onPageChange}
        onChange={onPageChange}
      />
    </div>
  );
};
list.propTypes = {
  listData: PropTypes.array,
  listPagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};

export default list;
