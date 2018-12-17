/* CREATE BY yunbaoyuan 2018/02/06 下午13:26:16*/
import React, { PropTypes } from 'react';
import { Form, Modal, Alert, Tree, Spin, Icon, Tooltip } from 'antd';

const TreeNode = Tree.TreeNode;

const modal = ({
   visible,
   title,
   modalErr,
   modalErrValue,
   loading,
   treeShopData,
   treeShopOption,
   onOk,
   onCancel,
   onCheckShop,
   onTitle,
 }) => {
  // 选择树方法
  const loopTree = data => data.map((item) => {
    if (item.children && item.children.length > 0) {
      return (<TreeNode
        key={item.id}
        title={`${item.name}(${item.childrenNum}家)`}
      >
        {loopTree(item.children)}
      </TreeNode>);
    }
    return (<TreeNode
      key={`${item.id}&${item.shopid}`}
      title={item.preAppsName.length === 0
        ? item.name
        : <Tooltip placement="right" title={onTitle(item)} >{item.name}<Icon type="exclamation-circle" style={{ marginLeft: 8 }} /></Tooltip>
        }
      disabled={item.preAppsName.length > 0}
    />);
  });
  const modalOpts = {
    width: 600,
    title,
    visible,
    onOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
  };
  return (
    <Modal {...modalOpts}>
      <div style={{ minHeight: 300 }}>
        {modalErr && <Alert message={modalErrValue} type="error" showIcon banner />}
        {
          treeShopData.length > 0 ? <Tree
            checkable
            defaultExpandedKeys={[treeShopData[0].id]}
            checkedKeys={treeShopOption.checkedKeys}
            onCheck={onCheckShop}
          >
            {loopTree(treeShopData)}
          </Tree>
            : <div style={{ textAlign: 'center', paddingTop: '25%' }}>
              <Spin />
            </div>
        }
      </div>
    </Modal>
  );
};

modal.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
  modalErr: PropTypes.bool,
  modalErrValue: PropTypes.string,
  treeShopData: PropTypes.array,
  treeShopOption: PropTypes.object,
  onCheckShop: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onTitle: PropTypes.func,
};

export default Form.create()(modal);
