import { parse } from 'qs';
import { queryPosts, queryPostById, queryRoles } from '../../services/system/role';
import { getSession } from '../../utils/index';

export default {
  namespace: 'role',
  state: {
    loading: false,
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
                page: {
                  pageno: 1, // 查看第几页内容 默认1
                  rowcount: 10, // 一页展示条数 默认10
                  orderby: {},
                },
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
    * editPost({ payload }, { call, put }) {
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
            postName: data[0].postName || null,
            postCode: data[0].postCode || null,
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
