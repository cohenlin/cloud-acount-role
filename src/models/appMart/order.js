/* CREATE BY yunbaoyuan 2018/02/02 下午13:26:16*/
import { parse } from 'qs';
// import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { inquireShop } from '../../services/app';
import { inquire, create } from '../../services/appMart/order';
import { treeToArray } from '../../utils/index';

export default {
  namespace: 'order',
  state: {
    loading: false,
    appId: null,
    appInfos: {
      applicationIcon: null,
      applicationName: '暂无数据',
      authDuration: [],
      description: '暂无数据',
      price: 0,
      sellStrategy: 0,
      sellType: 0,
      authType: 0,
      viewPath: '',
    },
    shopNum: 0,
    orderDuration: 0,
    modalVisible: false,
    modalKey: null,
    modalError: false,
    modalErrorValue: null,
    // 选择门店字段
    treeShopData: [],
    cacheCheckedKeys: [],
    shopIdArray: [],
    treeShopOption: {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    },
    filters: {
      vscode: '',
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        const pathname = location.pathname;
        const re = pathToRegexp('/system/app/order/:appId');
        const match = re.exec(pathname);
        // 如果匹配则把storeId保存并请求该店信息，无论是否匹配，都请求分类
        if (match) {
          const appId = match[1];
          dispatch({
            type: 'updateState',
            payload: { appId },
          });
          // 请求应用基本信息
          dispatch({
            type: 'query',
            payload: { appId },
          });
          dispatch({
            type: 'queryShop',
            payload: {
              appid: appId,
            },
          });
        }
      });
    },
  },
  effects: {
    // 获取应用基本信息
    * query({ payload }, { call, put }) {
      const res = yield call(inquire, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            appInfos: data || {
              applicationIcon: null,
              applicationName: '暂无数据',
              authDuration: [],
              description: '暂无数据',
              price: 0,
              sellStrategy: 0,
              sellType: 0,
              authType: 0,
              viewPath: '',
            },
          },
        });
      }
    },
    // 获取门店树列表
    * queryShop({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireShop, parse(payload));
      const { code, data, msg } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            treeShopData: data || [],
            orderDuration: 0,
            shopIdArray: data ? treeToArray(data, 'shopid') : [],
            treeShopOption: {
              checkedKeys: [],
              selectedKeys: data ? treeToArray(data, 'id') : [],
            },
          },
        });
      } else if (msg) {
        yield put({
          type: 'updateState',
          payload: {
            modalError: true,
            modalErrorValue: msg,
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 提交订购信息
    * add({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const appInfos = yield select(state => state.order.appInfos);
      const res = yield call(create, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        yield put({ type: 'hideLoading' });
        // 如果是免费的，跳转到免费成功页面；如果是收费的，跳转到审核的成功页面
        if (appInfos.sellStrategy === 0) {
          yield put(routerRedux.push('/system/app/order/result/free'));
        } else if (appInfos.sellStrategy === 1) {
          yield put(routerRedux.push('/system/app/order/result/pay'));
        }
        // 保存成功后清空之前的数据
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
        modalVisible: true,
        modalKey: Date.parse(new Date()) / 1000,
      };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },

    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
