/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'antd';

const search = ({
  onEdit,
  onBack,
}) => (
  <div className="search">
    <div className="action-box">
      <Row>
        <Col span={24}>
          <Button onClick={onEdit} type="primary">配置第三方渠道</Button>
          <Button onClick={onBack}>返回</Button>
        </Col>
      </Row>
    </div>
  </div>);

search.propTypes = {
  onEdit: PropTypes.func,
  onBack: PropTypes.func,
};

export default search;
