/**
 * Create by liukang on 2018/03/06
 * */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { inquire, enable, update, remove, create } from '../../services/payment/receiptAccount';
import { pageModel } from '../common';
import getKey from '../../utils/getKey';
import { Payment } from '../../utils/enums';

const { State } = Payment;

export default modelExtend(pageModel, {
  namespace: 'receiptAccount',
  state: {
    merchantId: '',  // 商户id
    loading: false,
    selectedRows: [], // table选中的行
    selectedStarts: [],
    selectedBlocks: [],
    startBtnStatus: true,
    blockBtnStatus: true,
    deleteBtnStatus: true,
    searchInfo: '', // 搜索关键字
    modalVisible: false, // 弹窗
    modalKey: getKey(),
    item: {}, // 当前编辑条目
  },
  subscriptions: {
    setup({ dispatch, history }) {
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
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      const { pagination, searchInfo } = yield select(state => state.receiptAccount);
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
    * onOff({ payload }, { call, put }) {
      const res = yield call(enable, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        message.success(payload.enable === State.ENABLE ? '启用成功' : '停用成功');
        yield put({
          type: 'query',
        });
      }
    },
    * add({ payload }, { call, put }) {
      const res = yield call(create, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        message.success('新增成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
    * edit({ payload }, { call, put }) {
      const res = yield call(update, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        message.success('编辑成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
    * delete({ payload }, { call, put }) {
      const res = yield call(remove, payload);
      const { code } = res.data;
      if (code === '200') {
        message.success('删除成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
  },
  reducers: {
    // 显示编辑弹窗
    showModal(state, { payload }) {
      const item = cloneDeep(payload.item);
      return { ...state, item, modalKey: getKey(), modalVisible: true };
    },
    // 隐藏编辑弹窗
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
});
