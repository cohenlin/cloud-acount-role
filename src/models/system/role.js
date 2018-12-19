import { parse } from 'qs';
import { message } from 'antd';
import { queryPosts, queryPostById, queryRoles, savePost, deletePost, changeStatus } from '../../services/system/role';
import { getSession } from '../../utils/index';

export default {
  namespace: 'role',
  state: {
    visible: false,
    loading: false,
    postName: null,
    postCode: null,
    title: null,
    checkedPost: [],
    checkedPostId: [], // 选中的角色ID
    deleteBtnStatus: false, // 删除按钮禁用状态
    startBtnStatus: false,  // 启用按钮禁用状态
    blockBtnStatus: false,  // 停用按钮禁用状态
    checkedPostStartId: [], // 选中可停用员工id
    checkedPostBlockId: [], // 选中可启用员工id
    postList: [], // 岗位角色列表
    roleList: [], // 权限列表
    listPagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
    checkedRoleKeys: [], // 新增界面选择权限树节点集合
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/set/role') {
              // 取得是否登录变量
          const isLogin = getSession('isLogin');
              // 请求相关信息
          if (isLogin && isLogin === 'yes') {
                // 查询角色列表数据
            dispatch({
              type: 'queryList',
              payload: {
                pageno: 1, // 查看第几页内容 默认1
                rowcount: 10, // 一页展示条数 默认10
                orderby: {},
              },
            });
            dispatch({
              type: 'queryRoles',
              payload: {},
            });
            dispatch({ // 设置是否是个人中心，用来控制左侧菜单
              type: 'account/updateState',
              payload: {
                isPersonal: false,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    // 获取角色信息列表
    * queryList({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const oldPage = yield select(state => state.role.listPagination);
      const res = yield call(queryPosts, parse(payload));
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            postList: data || [],
            listPagination: {
              ...oldPage,
              total: page ? page.total : 0,
              current: page ? page.pageno : 1,
              pageSize: page ? page.rowcount : '10',
            },
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * editPost({ payload }, { call, put, select }) {
      // 显示加载标识
      yield put({ type: 'showLoading' });
      // 根据id请求角色信息
      const res = yield call(queryPostById, parse(payload));
      // 解构响应内容
      const { data, code } = res.data;
      if (code === '200' && data && data.length) {
        // 调querySuccess，将响应内容覆盖到state中，并关掉加载标识
        yield put({
          type: 'querySuccess',
          payload: {
            postId: data[0].id || null,
            postName: data[0].postName || null,
            postCode: data[0].postCode || null,
          },
        });
        // 编辑时回显权限树
        const postList = yield select(state => state.role.postList);
        const postId = yield select(state => state.role.postId);
        const nodeIdList = [];
        postList.map((item) => {
          if (item.id === postId) {
            item.nodeIdList.map(id => nodeIdList.push(id));
          }
          return null;
        });
        yield put({
          type: 'updateState',
          payload: {
            checkedRoleKeys: nodeIdList,
          },
        });
      }
    },
    * queryRoles({ payload }, { call, put }) {
      // 显示加载标识
      yield put({ type: 'showLoading' });
      // 根据id请求角色信息
      const res = yield call(queryRoles, parse(payload));
      // 解构响应内容
      const { data, code } = res.data;
      if (code === '200') {
        // 调querySuccess，将响应内容覆盖到state中，并关掉加载标识
        yield put({
          type: 'querySuccess',
          payload: {
            roleList: data || [],
          },
        });
      }
    },
    // 判断状态
    * judgeStatus({ payload }, { put, select }) {
      const { checkedPost } = yield select(state => state.role);
      const startArray = checkedPost.filter(item => item.status === 1).map(item => item.id); // 被选中的启用数组
      const blockArray = checkedPost.filter(item => item.status === 0).map(item => item.id); // 被选中的停用数组
      yield put({
        type: 'updateState',
        payload: {
          deleteBtnStatus: checkedPost.length > 0,
          startBtnStatus: (blockArray.length > 0),
          blockBtnStatus: (startArray.length > 0),
          checkedPostStartId: startArray, // 选中可停用员工id
          checkedPostBlockId: blockArray, // 选中可启用员工id
        },
      });
    },
    // 重载页面
    * reload({ payload }, { put, select }) {
      const role = yield select(state => state.role);
      yield put({
        type: 'queryList',
        payload: {
          page: {
            pageno: role.listPagination.current, // 查看第几页内容 默认1
            rowcount: role.listPagination.pageSize, // 一页展示条数 默认10
            orderby: {},
          },
        },
      });
    },
    // 新增角色
    * savePost({ payload }, { put, call }) {
      // 显示加载标识
      yield put({ type: 'showLoading' });
      // 请求新增角色接口
      const res = yield call(savePost, parse(payload));
      // 解构响应内容
      const { data, code } = res.data;
      if (code === '200') {
        // 新增成功
        message.success('操作成功');
        yield put({
          type: 'querySuccess',
          payload: {
            visible: false,
          },
        });
        yield put({ type: 'reload' });
      } else {
        // 新增失败
        message.error(data);
        yield put({ type: 'hideLoading' });
      }
    },

    // 删除角色
    * deletePost({ payload }, { put, call }) {
      // 显示加载标识
      yield put({ type: 'showLoading' });
      // 请求新增角色接口
      const res = yield call(deletePost, parse(payload));
      // 解构响应内容
      const { data, code } = res.data;
      if (code === '200') {
        // 新增成功
        message.success('删除成功');
        yield put({ type: 'reload' });
      } else {
        // 新增失败
        message.error(data);
        yield put({ type: 'hideLoading' });
      }
    },

    // 启用或禁用角色
    * changeStatus({ payload }, { put, call }) {
          // 显示加载标识
      yield put({ type: 'showLoading' });
          // 请求新增角色接口
      const res = yield call(changeStatus, parse(payload));
          // 解构响应内容
      const { data, code } = res.data;
      if (code === '200') {
            // 新增成功
        message.success('操作成功');
        yield put({ type: 'reload' });
      } else {
            // 新增失败
        message.error(data);
        yield put({ type: 'hideLoading' });
      }
    },

  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    showModal(state, action) {
      return {
        ...state,
        ...action.payload,
        visible: true,
        modalKey: Date.parse(new Date()) / 1000,
      };
    },
    hideModal(state) {
      return { ...state, visible: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
