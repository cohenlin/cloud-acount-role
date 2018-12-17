/**
 * Create by liukang on 2018/03/06
 * */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { message } from 'antd';
import { inquire, bind, inquireAccount } from '../../services/payment/bindAccount';
import { pageModel } from '../common';
import getKey from '../../utils/getKey';

export default modelExtend(pageModel, {
  namespace: 'bindAccount',
  state: {
    merchantId: '',  // 商户id
    loading: false,
    searchInfo: '', // 搜索关键字
    isInit: false, // 弹窗
    modalKey: getKey(),
    currentAccount: {}, // 当前绑定账户
    currentId: '', // 当前选中账户id
    item: '',  // 当前门店
  },
  subscriptions: {
    /* setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/set/receiptAccount') {
          dispatch({
            type: 'query',
            payload: {
              current: 1,
              keyword: null,
            },
          });
        }
      });
    },*/
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      const { pagination, searchInfo } = yield select(state => state.bindAccount);
      const params = {
        size: pagination.pageSize,
        current: pagination.current,
        keyword: searchInfo,
        ...payload,
      };
      const res = yield call(inquire, parse(params));
      const { data, code, page } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data || [],
            pagination: {
              total: Number.parseInt(page.total, 10),
              current: Number.parseInt(page.pageno, 10),
              pageSize: Number.parseInt(page.rowcount, 10),
            },
          },
        });
      }
    },
    * queryAccount({ payload }, { call, put }) {
      const res = yield call(inquireAccount, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        const account = data || {};
        const id = account.id || '';
        yield put({
          type: 'updateState',
          payload: {
            currentAccount: account,
            currentId: id,
          },
        });
      }
    },
    * updateItem({ payload }, { put }) {
      const { item } = payload;
      yield put({
        type: 'updateState',
        payload: {
          ...payload,
          currentId: '',
        },
      });
      yield put({
        type: 'queryAccount',
        payload: {
          ...item,
        },
      });
      yield put({
        type: 'query',
        payload: {
          current: 1,
          keyword: null,
        },
      });
    },
    * bind({ payload }, { call, select }) {
      const { currentId, item } = yield select(state => state.bindAccount);
      const params = {
        accId: currentId,
        code: item.bohCode,
        name: item.name,
      };
      const res = yield call(bind, parse(params));
      const { code } = res.data;
      if (code === '200') {
        message.success('绑定成功！');
      }
    },
  },
  reducers: {
  },
});
