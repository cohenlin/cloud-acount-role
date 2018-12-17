import React, { PropTypes } from 'react';
import { Input, Form, Icon } from 'antd';

const Search = Input.Search;

const search = ({
    searchInfo,
    onSearch,
    onSearchChange,
    onClearSearchInfo,
}) => (
  <div style={{ textAlign: 'right' }}>
    <Search
      key="search"
      value={searchInfo}
      onChange={onSearchChange}
      onPressEnter={onSearch}
      onSearch={onSearch}
      placeholder="搜索应用"
      style={{ width: 280 }}
      maxLength="20"
      suffix={searchInfo &&
        <Icon
          type="close-circle"
          style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.35)', cursor: 'pointer', marginRight: '8px' }}
          onClick={onClearSearchInfo}
        />}
      enterButton="搜 索"
    />
  </div>
  );


search.propTypes = {
  searchInfo: PropTypes.string,
  onSearch: PropTypes.func,
  onSearchChange: PropTypes.func,
  onClearSearchInfo: PropTypes.func,
};

export default Form.create()(search);

