/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Modal, Tree } from 'antd';

const TreeNode = Tree.TreeNode;

const modal = ({
                 visible,
                 onConfirm,
                 onCancel,
                 shopData,
                 onCheckedShop,
                 checkedShopIds,
}) => {
  const modalProps = {
    maskClosable: false,
    width: 600,
    title: '绑定门店',
    visible,
    cancelText: '取消',
    okText: '保存',
    onOk() {
      onConfirm();
    },
    onCancel,
  };
  const rootKey = shopData[0] ? shopData[0].id : '';
  const renderTreeNodes = data => data.map((item) => {
    // 是否已绑定门店
    const isBind = item.isBind === 1;
    const title = (() => {
      let newTitle = item.name;
      if (item.isLeaf === 1) {
        if (isBind) {
          newTitle += '(已绑定)';
        }
      } else {
        newTitle += ` (${item.childrenNum}家店)`;
      }
      return newTitle;
    })();
    const treeNodeProps = {
      title,
      key: item.id,
      disableCheckbox: isBind,
      dataRef: item,
    };
    return (
      <TreeNode {...treeNodeProps}>
        {item.children && item.children.length > 0 &&
        renderTreeNodes(item.children)}
      </TreeNode>
    );
  });
  return (
    <Modal {...modalProps}>
      <Tree
        checkable
        onCheck={onCheckedShop}
        checkedKeys={checkedShopIds}
        defaultExpandedKeys={[rootKey]}
      >
        {renderTreeNodes(shopData)}
      </Tree>
    </Modal>
  );
};

modal.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  shopData: PropTypes.array,
  checkedShopIds: PropTypes.array,
  onCheckedShop: PropTypes.func,
};

export default modal;
