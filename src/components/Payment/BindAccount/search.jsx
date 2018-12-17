/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Icon } from 'antd';

const Search = Input.Search;

const search = ({
                    onSearchChange,
                    onSearch,
                    searchInfo,
                    onClearSearchInfo,
}) => (
  <div>
    <Form layout="inline">
      <Row style={{ marginBottom: 16 }}>
        {/* <Col span={24} style={{ textAlign: 'left', marginBottom: '10px' }}>
          <span>当前绑定账户: 北方大区</span>
        </Col>*/}
        <Col span={24} style={{ textAlign: 'right' }}>
          <Search
            key="search"
            value={searchInfo}
            onChange={onSearchChange}
            onPressEnter={onSearch}
            onSearch={onSearch}
            placeholder="输入账户名称"
            style={{ width: 280 }}
            suffix={searchInfo &&
            <Icon
              type="close-circle"
              style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.35)', cursor: 'pointer', marginRight: '8px' }}
              onClick={onClearSearchInfo}
            />}
            enterButton="搜 索"
          />
        </Col>
      </Row>
    </Form>
  </div>);

search.propTypes = {
  onSearchChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchInfo: PropTypes.string,
  onClearSearchInfo: PropTypes.func,
};

export default Form.create()(search);
