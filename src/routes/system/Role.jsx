import React, { PropTypes } from 'react';
import { connect } from 'dva';
import List from '../../components/System/Role/list';
import Modal from '../../components/System/Role/modal';
import Search from '../../components/System/Role/search';

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
        checkedPost,
        checkedPostId, // 选中的角色ID
        deleteBtnStatus, // 删除按钮禁用状态
        startBtnStatus,  // 启用按钮禁用状态
        blockBtnStatus,  // 停用按钮禁用状态
        checkedPostStartId, // 选中可停用员工id
        checkedPostBlockId, // 选中可启用员工id
    } = cloudState.role;
  // 取得Post页面的button权限
  const postButton = cloudState.account.buttonPermissions.system.set.role;
    // 列表组件属性
  const listProps = {
    loading,
    postList,
    listPagination,
    postButton,
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
    onDelectPost() {
    },
    // 选择员工
    onSelectPost() {
    },
    onChangeSorter() {
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
  const searchProps = {
    loading,
    checkedPost,
    deleteBtnStatus, // 删除按钮禁用状态
    startBtnStatus,  // 启用按钮禁用状态
    blockBtnStatus,  // 停用按钮禁用状态
    checkedPostStartId, // 选中可停用员工id
    checkedPostBlockId, // 选中可启用员工id
    checkedPostId,
    postButton,
    onAdd() {
      dispatch({
        type: 'role/updateState',
        payload: {
          postId: '',
          postName: '',
          postCode: 0,
        },
      });
      dispatch({
        type: 'role/queryPostList',
      });
      dispatch({
        type: 'role/showModal',
      });
    },
    // 停用
    onBlock() {
      const checkedPostIds = checkedPostStartId.join(',');
      dispatch({
        type: 'role/enableOrDisable',
        payload: {
          ids: checkedPostIds,
          status: '0',
        },
      });
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedPostId: [],
          checkedPost: [],
          checkedPostStartId: [], // 选中可停用员工id
          checkedPostBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,
        },
      });
    },
    // 启用
    onStart() {
      const checkedPostIds = checkedPostBlockId.join(',');
      dispatch({
        type: 'role/enableOrDisable',
        payload: {
          ids: checkedPostIds,
          status: '1',
        },
      });
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedPostId: [],
          checkedPost: [],
          checkedPostStartId: [], // 选中可停用员工id
          checkedPostBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,

        },
      });
    },
    // 删除
    onDelete() {
      const checkedPostIds = checkedPostId.join(',');
      dispatch({
        type: 'role/deletePost',
        payload: {
          ids: checkedPostIds,
        },
      });
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedPostId: [],
          checkedPost: [],
          checkedPostStartId: [], // 选中可停用员工id
          checkedPostBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
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
