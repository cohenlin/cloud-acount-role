/**
 * Created by Wangtaidong on 2017/12/22.
 */
// import { message } from 'antd';
import { inquire, inquireStore, inquireShop } from '../../services/system/organization';
import { getSession } from '../../utils/index';


function formatList(list) { // 格式化数据，门店名称显示为name+childrenNum,例如：北京（5家）
  list.forEach((item) => {
    const item2 = item; // ESlint不允许直接修改参数的值，用item2引用item
    if (item2.childrenNum > 0) {
      item2.name = `${item2.name}(${item2.childrenNum}家)`;
      formatList(item2.children);
    } else {
      delete item2.children;
    }
  });
}

export default {
  namespace: 'organization',
  state: {
    searchId: [],
    searchName: '',
    currentItem: {},
    treeDate: [],
    shopList: [],
    modalVisible: false,
    loading: false,
    pagination: {
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
        if (location.pathname === '/system/set/organization') {
          // 取得是否登录变量
          const isLogin = getSession('isLogin');
          // 请求相关信息
          if (isLogin && isLogin === 'yes') {
            dispatch({
              type: 'query',
              payload: {},
            });
            dispatch({
              type: 'queryShop',
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
    * query({ payload }, { call, put }) { // 获取树结构
      yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      const { data, code } = res.data;
      if (code === '200') {
        if (data) {
          formatList(data);
        }
        yield put({
          type: 'querySuccess',
          payload: {
            treeDate: data || [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * queryShop({ payload }, { call, put, select }) {   // 查询门店信息
      const oldPage = yield select(state => state.organization.pagination);
      const res = yield call(inquireShop, payload);
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            pagination: {
              ...oldPage,
              total: page.total || 0,
              pageSize: page.rowcount || '10',
              current: page.pageno || 1,
            },
            shopList: data || [],
          },
        });
      }
    },
    * edit({ payload }, { call, put }) { // 编辑门店信息，根据storeId请求具体门店信息
      const res = yield call(inquireStore, payload);
      const { data, code } = res.data;
      if (code === '200') {
        yield put({ type: 'showModal' });
        yield put({
          type: 'querySuccess',
          payload: {
            currentItem: data || {},
          },
        });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    querySuccess(state, { payload }) {
      return { ...state, ...payload, loading: false };
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, visible: true };
    },

    hideModal(state) {
      return { ...state, visible: false };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },
};
