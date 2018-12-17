/**
 * Created by Wangtaidong on 2018/2/1.
 */
import { message } from 'antd';
import { inquire, inquireApps, inquireShops, abolish } from '../../services/appMart/orderRecord';

export default {
  namespace: 'orderRecord',
  state: {
    // searcch props
    loading: false,
    apps: [],
    selectAppId: '',
    selectStatus: '',
    // list props
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
    pageModal: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
    // modal props
    visible: false,
    modalData: [],
    listData: [],
    orderId: '',
    tenantId: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/app/orderRecord') {
          dispatch({
            type: 'query',
            payload: {
              page: {
                pageno: 1, // 查看第几页内容 默认1
                rowcount: 10, // 一页展示条数 默认10
              },
              key: '',
              applicationId: '',
              status: '',
            },
          });
          dispatch({
            type: 'queryApps',
          });
        }
      });
    },
  },

  effects: {
    // 获取列表
    * query({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const paginationOld = yield select(state => state.orderRecord.pagination);
      const res = yield call(inquire, payload);
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data || [],
            pagination: {
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

    // 查询所有应用
    * queryApps({ payload }, { call, put }) {
      const res = yield call(inquireApps, payload);
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            apps: data || [],
          },
        });
      }
    },
    // 查看门店列表
    * queryShops({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const oldPage = yield select(state => state.orderRecord.pageModal);
      const res = yield call(inquireShops, payload);
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            modalData: data || [],
            pageModal: {
              ...oldPage,
              current: page.pageno,
              pageSize: page.rowcount,
              total: page.total,
            },
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 取消订单
    * cancel({ payload }, { call, put, select }) {
      const order = yield select(state => state.orderRecord);
      const res = yield call(abolish, payload);
      const { code } = res.data;
      if (code === '200') {
        yield put({
          type: 'query',
          payload: {
            page: {
              pageno: order.pagination.current,
              rowcount: order.pagination.pageSize,
            },
            key: order.searchWord,
            applicationId: order.selectAppId,
            status: order.selectStatus,
          },
        });
        message.success('取消订单成功！');
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
    showModal(state) {
      return { ...state, visible: true };
    },
    hideModal(state) {
      return { ...state, visible: false };
    },
    querySuccess(state, { payload }) {
      return { ...state, ...payload, loading: false };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
