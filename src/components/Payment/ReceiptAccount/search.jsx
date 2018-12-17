/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Input, Button, Row, Col, Icon, Modal } from 'antd';

const confirm = Modal.confirm;
const Search = Input.Search;

const search = ({
                    onBlock,
                    onStart,
                    onSearchChange,
                    onSearch,
                    onDelete,
                    searchInfo,
                    onAdd,
                    onClearSearchInfo,
                    selectedRows,
                    startBtnStatus,
                    blockBtnStatus,
                    deleteBtnStatus,
                    selectedStarts,
                    selectedBlocks,
}) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    let content = '';
    let num = 0;
    const CheckedSelectedRows = selectedRows.length;
    switch (info) {
      case '启用':
        num = selectedBlocks.length;
        content = `当前选中${CheckedSelectedRows}个账户，可启用${num}个！`;
        break;
      case '停用':
        num = selectedStarts.length;
        content = `当前选中${CheckedSelectedRows}个账户，可停用${num}个！`;
        break;
      case '删除':
        content = `当前选中${CheckedSelectedRows}个账户，确定删除吗！`;
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
          case '启用':
            onStart();
            break;
          case '停用':
            onBlock();
            break;
          case '删除':
            onDelete();
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
            <Button onClick={onAdd} icon="plus" type="primary">新增账户</Button>
            <Button value="停用" onClick={showConfirm} disabled={blockBtnStatus}>停用</Button>
            <Button value="启用" onClick={showConfirm} disabled={startBtnStatus}>启用</Button>
            <Button value="删除" onClick={showConfirm} disabled={deleteBtnStatus}>删除</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
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
      </div>
    </div>);
};
search.propTypes = {
  onBlock: PropTypes.func,
  onStart: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchInfo: PropTypes.string,
  onClearSearchInfo: PropTypes.func,
  selectedRows: PropTypes.array,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  startBtnStatus: PropTypes.bool,
  blockBtnStatus: PropTypes.bool,
  deleteBtnStatus: PropTypes.bool,
  selectedStarts: PropTypes.array,
  selectedBlocks: PropTypes.array,
};

export default search;
