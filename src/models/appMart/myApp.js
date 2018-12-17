import { parse } from 'qs';
// import { message } from 'antd';
import inquire from '../../services/appMart/myApp';

export default {
  namespace: 'myApp',

  state: {
    loading: false,
    listData: [],
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
        if (location.pathname === '/system/app/myApp') {
          dispatch({
            type: 'query',
            payload: {
              pageno: 1,
              rowcount: 10,
            },
          });
        }
      });
    },
  },
  effects: {
    // 列表查询
    * query({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const paginationOld = yield select(state => state.myApp.listPagination);
      const res = yield call(inquire, parse(payload));
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data || [],
            listPagination: {
              ...paginationOld,
              total: page.total || 0,
              current: page.pageno || 1,
              pageSize: page.rowcount || '10',
            },
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
