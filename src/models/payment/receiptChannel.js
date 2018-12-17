/**
 * Create by liukang on 2018/03/06
 * */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { inquire, update, updateChannel, inquireChannel, inquireConfigure } from '../../services/payment/receiptChannel';
import { pageModel } from '../common';
import getKey from '../../utils/getKey';

export default modelExtend(pageModel, {
  namespace: 'receiptChannel',
  state: {
    accId: '', // 账户id
    loading: false,
    selectedRows: [], // table选中的行
    searchInfo: '', // 搜索关键字
    modalVisible: false, // 弹窗
    channelModalVisible: false, // 配置渠道弹窗
    modalKey: getKey(),
    channelModalKey: getKey('channel'),
    item: {}, // 当前编辑条目
    channel: [], // 可选渠道
    selectedChannel: [],  // 已选择渠道
    aggregator: [],  // 聚合服务商选项列表
    isv: [],  // ISV选项列表
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname;
        const re = pathToRegexp('/system/set/receiptAccount/channel/:accId');// 有冒号
        const match = re.exec(pathname);
        if (match) {
          const accId = match[1];
          dispatch({
            type: 'updateState',
            payload: {
              accId,
            },
          });
          dispatch({
            type: 'query',
            payload: {
              current: 1,
              keyword: null,
              accId,
            },
          });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      const {
        pagination,
        searchInfo,
        accId } = yield select(state => state.receiptChannel);
      const params = {
        size: pagination.pageSize,
        current: pagination.current,
        keyword: searchInfo,
        accId,
        ...payload,
      };
      const res = yield call(inquire, parse(params));
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data || [],
            /* pagination: {
              total: Number.parseInt(data.data.page.total, 10),
              current: Number.parseInt(data.data.page.pageno, 10),
              pageSize: Number.parseInt(data.data.page.rowcount, 10),
            },*/
          },
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
    // 配置开通渠道
    * editChannel({ payload }, { call, put, select }) {
      const { accId } = yield select(state => state.receiptChannel);
      const params = {
        accId,
        ids: payload,
      };
      const res = yield call(updateChannel, params);
      const { code } = res.data;
      if (code === '200') {
        message.success('配置成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'hideModalChannel',
        });
      }
    },
    // 获取开通渠道
    * queryChannel({ payload }, { call, put, select }) {
      const res = yield call(inquireChannel, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        const { list } = yield select(state => state.receiptChannel);
        const channel = data || [];
        const selectedChannel = list.map(it => it.channelCode);
        yield put({
          type: 'updateState',
          payload: {
            channel,
            selectedChannel,
            channelModalVisible: true,
          },
        });
      }
    },
    // 获取渠道配置详情
    * queryConfigure({ payload }, { call, put }) {
      const res = yield call(inquireConfigure, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        const { setting, ...other } = data || {};
        const item = {
          ...other,
          ...(setting ? JSON.parse(setting) : {}),
        };
        yield put({
          type: 'updateState',
          payload: {
            item,
          },
        });
        yield put({
          type: 'showModal',
        });
      }
    },
  },
  reducers: {
    // 显示编辑弹窗
    showModal(state) {
      return { ...state, modalKey: getKey(), modalVisible: true };
    },
    // 隐藏编辑弹窗
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    // 显示配置渠道弹窗
    showModalChannel(state) {
      return { ...state, channelModalKey: getKey('channel'), channelModalVisible: true };
    },
    // 隐藏配置渠道弹窗
    hideModalChannel(state) {
      return { ...state, channelModalVisible: false };
    },
  },
});
