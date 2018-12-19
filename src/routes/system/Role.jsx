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
        postId,
        postName,
        postCode,
        nodeIdList,
        listPagination,
        title,
        checkedPost,
        checkedPostId, // 选中的角色ID
        deleteBtnStatus, // 删除按钮禁用状态
        startBtnStatus,  // 启用按钮禁用状态
        blockBtnStatus,  // 停用按钮禁用状态
        checkedPostStartId, // 选中可停用员工id
        checkedPostBlockId, // 选中可启用员工id
        checkedRoleKeys, // 新增界面选择权限树节点集合
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
    onDelectPost(ids) {
      const checkedItems = []; // 剩余选中的元素数组
      const checkedIds = []; // 剩余选中的元素ID
      checkedPost.map((item) => {
        if (ids.indexOf(item.id) < 0) { // checkedPost中的当前元素不在取消选中的数组中
          checkedItems.push(item);
          checkedIds.push(item.id);
        }
        return null;
      });
      // 更新state
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedPost: checkedItems,
          checkedPostId: checkedIds,
        },
      });
      dispatch({
        type: 'role/judgeStatus',
      });
    },
    // 选择员工
    onSelectPost(selectedRows, record) {
      const checkedItems = [];
      const checkedIds = [];
      record.map((item) => {
        checkedItems.push({ id: item.id, status: item.status });// 记录选择的元素
        checkedIds.push(item.id);// 记录选择的id
        return null;
      });
      // 更新state
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedPost: [...checkedPost, ...checkedItems],
          checkedPostId: [...checkedPostId, ...checkedIds],
        },
      });
      dispatch({
        type: 'role/judgeStatus',
      });
    },
    // 触发翻页
    onChangeSorter(pagination) {
      dispatch({
        type: 'role/queryList',
        payload: {
          pageno: pagination.current, // 查看第几页内容 默认1
          rowcount: pagination.pageSize, // 一页展示条数 默认10
          orderby: {},
        },
      });
    },
  };
  const modalProps = {
    visible, // 控制模态框显示
    loading, // 加载标识
    title, // 模态框标题
    postId,
    postName,
    postCode,
    nodeIdList,
    roleList,
    postList,
    checkedRoleKeys,
    onCancel() {
      dispatch({
        type: 'role/updateState',
        payload: {
          visible: false,
        },
      });
    },
    // 新增角色，提交表单
    onSubmit(values) {
      const {
        post_name,
        post_code,
        node_id_list,
      } = values;
      dispatch({
        type: 'role/savePost',
        payload: {
          postName: post_name,
          postCode: post_code,
          nodeIdList: node_id_list,
        },
      });
    },
    onCheck(checkedKeys) {
      dispatch({
        type: 'role/updateState',
        payload: {
          checkedRoleKeys: checkedKeys,
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
          postId: null,
          postName: null,
          postCode: null,
          checkedRoleKeys: [],
          title: '新增角色',
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
        type: 'role/changeStatus',
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
          deleteBtnStatus: false,
          startBtnStatus: false,
          blockBtnStatus: false,
        },
      });
    },
    // 启用
    onStart() {
      const checkedPostIds = checkedPostBlockId.join(',');
      dispatch({
        type: 'role/changeStatus',
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
          deleteBtnStatus: false,
          startBtnStatus: false,
          blockBtnStatus: false,
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
          deleteBtnStatus: false,
          startBtnStatus: false,
          blockBtnStatus: false,
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
