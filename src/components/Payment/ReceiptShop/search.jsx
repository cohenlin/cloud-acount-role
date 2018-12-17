/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Input, Button, Row, Col, Icon, Modal, message } from 'antd';

const confirm = Modal.confirm;
const Search = Input.Search;

const search = ({
                    onSearchChange,
                    onSearch,
                    searchInfo,
                    onAdd,
                    onClearSearchInfo,
                    selectedRows,
                    onBack,
                    onUnbind,
}) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    let content = '';
    const CheckedSelectedRows = selectedRows.length;
    if (CheckedSelectedRows <= 0) {
      message.warning('没有选择的门店');
      return;
    }
    switch (info) {
      case '取消绑定':
        content = `当前选中${CheckedSelectedRows}个门店，确定取消绑定吗！`;
        break;
      default:
        break;
    }
    confirm({
      title: `确定${e.target.value}吗？`,
      content,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        switch (info) {
          case '取消绑定':
            onUnbind();
            break;
          default:
            break;
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="search">
      <div className="action-box">
        <Row>
          <Col span={12}>
            <Button onClick={onAdd} type="primary">绑定门店</Button>
            <Button value="取消绑定" onClick={showConfirm}>取消绑定</Button>
            <Button value="后退" onClick={onBack}>后退</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Search
              key="search"
              value={searchInfo}
              onChange={onSearchChange}
              onPressEnter={onSearch}
              onSearch={onSearch}
              placeholder="输入门店名称"
              style={{ width: 280 }}
              suffix={searchInfo &&
                <Icon
                  key="search-icon"
                  type="close-circle"
                  style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.35)', cursor: 'pointer', marginRight: '8px' }}
                  onClick={onClearSearchInfo}
                />}
              enterButton="搜 索"
            />
          </Col>
        </Row>
      </div>
    </div>);
};

search.propTypes = {
  onSearchChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchInfo: PropTypes.string,
  onClearSearchInfo: PropTypes.func,
  selectedRows: PropTypes.array,
  onAdd: PropTypes.func,
  onBack: PropTypes.func,
  onUnbind: PropTypes.func,
};

export default search;
