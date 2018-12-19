import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

const feature = ({
     loading,
     postButton,
     onAdd,           // 新增角色
     deleteBtnStatus, // 删除按钮禁用状态
     startBtnStatus,  // 启用按钮禁用状态
     blockBtnStatus,  // 停用按钮禁用状态
     onBlock,       // 停用
     onStart,       // 启用
     onDelete,      // 删除
     checkedPostStartId, // 选中可停用角色id
     checkedPostBlockId, // 选中可启用角色id
     checkedPost,  // 选中角色
    }) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    let postNumber = 0;
    let content = '';
    const checkedPostNumber = checkedPost.length;
    switch (info) {
      case '删除':
        postNumber = checkedPost.length;
        content = `删除选中的${postNumber}个员工！`;
        break;
      case '启用':
        postNumber = checkedPostBlockId.length;
        content = `当前选中${checkedPostNumber}个员工，可启用${postNumber}个员工！`;
        break;
      case '停用':
        postNumber = checkedPostStartId.length;
        content = `当前选中${checkedPostNumber}个员工，可停用${postNumber}个员工！`;
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
          case '删除':
            onDelete();
            break;
          case '启用':
            onStart();
            break;
          case '停用':
            onBlock();
            break;
          default:
            break;
        }
      },
      onCancel() {},
    });
  };
  return (
    <div className="components-search search">
      <div className="action-box">
        <Row >
          <Col span={16}>
            {postButton && postButton.add && <Button type="primary" onClick={onAdd}>+ 新增角色</Button>}
            {postButton && postButton.off && <Button onClick={showConfirm} value="停用" disabled={!blockBtnStatus} loading={loading}>停用</Button>}
            {postButton && postButton.on && <Button onClick={showConfirm} value="启用" disabled={!startBtnStatus} loading={loading}>启用</Button>}
            {postButton && postButton.delete && <Button onClick={showConfirm} value="删除" disabled={!deleteBtnStatus} loading={loading}>删除</Button>}
          </Col>
        </Row>
      </div>
    </div>);
};
feature.propTypes = {
  postButton: PropTypes.object,
  deleteBtnStatus: PropTypes.bool,
  startBtnStatus: PropTypes.bool,
  blockBtnStatus: PropTypes.bool,
  onAdd: PropTypes.func,
  onBlock: PropTypes.func,
  onStart: PropTypes.func,
  onDelete: PropTypes.func,
  checkedPostStartId: PropTypes.array, // 选中可停用员工id
  checkedPostBlockId: PropTypes.array, // 选中可启用员工id
  loading: PropTypes.bool,
};

export default Form.create()(feature);
