import React, { PropTypes } from 'react';
import { connect } from 'dva';
import List from '../../components/System/Role/list';
import Modal from '../../components/System/Role/modal';

const Role = ({ dispatch, cloudState }) => {
    // 解构cloudState中的属性
  const {
        visible,
        loading,
        roleList,
        postList,
        postName,
        postCode,
        listPagination,
        title,
        checkedPostId, // 选中的角色ID
    } = cloudState.role;
  // 取得staff页面的button权限
  const roleButton = cloudState.account.buttonPermissions.system.set.role;
    // 列表组件属性
  const listProps = {
    loading,
    postList,
    listPagination,
    roleButton,
    checkedPostId, // 选中的角色ID
    onEdit(record) {
      dispatch({
        type: 'role/updateState',
        payload: {
          roleId: record.id,
          title: '编辑角色',
          postName: '',
          userCount: '',
        },
      });
      dispatch({
        type: 'role/editPost',
        payload: {
          ids: record.id,
        },
      });
      dispatch({
        type: 'role/showModal',
      });
    },
  };
  const modalProps = {
    visible, // 控制模态框显示
    loading, // 加载标识
    title, // 模态框标题
    postName,
    postCode,
    roleList,
    onCancel() {
      dispatch({
        type: 'role/updateState',
        payload: {
          visible: false,
        },
      });
    },
  };
  return (
    <div>
      <List {...listProps} />
      <Modal {...modalProps} />
    </div>
  );
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

Role.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(Role);
