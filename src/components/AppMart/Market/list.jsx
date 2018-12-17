import React, { PropTypes } from 'react';
import { List, Button, Tag, Pagination, Row, Col } from 'antd';

import styles from './index.less';

const list = ({
      listData,
      listPagination,
      onOrder,
      onPageChange,
}) => (
  <div className={styles.appList}>
    <List
      itemLayout="horizontal"
      dataSource={listData}
      renderItem={item => (
        <List.Item actions={[<Button type="primary" onClick={() => onOrder(item.id)}>订购</Button>]}>
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
                <Col span={24}>
                  <p className="cont">{item.description}</p>
                  {item.sellStrategy === 0 && <Tag color="green">免费</Tag>}
                  {item.sellStrategy === 1 && <Tag color="orange">收费</Tag>}
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


list.propTypes = {
  listData: PropTypes.array,
  listPagination: PropTypes.object,
  onOrder: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default list;
