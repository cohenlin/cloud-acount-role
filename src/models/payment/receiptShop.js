/**
 * Create by liukang on 2018/03/06
 * */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { inquire, unbind, unbindAll, bind, inquireStores, inquireBinds } from '../../services/payment/receiptShop';
import { pageModel } from '../common';
import getKey from '../../utils/getKey';

// 门店树转map
const getShopMap = (array, key) => {
  let newMap = {};
  array.forEach((item) => {
    const children = item.children;
    if (item.isLeaf === 1) {
      newMap[item[key]] = item;
    } else if (children && children.length > 0) {
      newMap = {
        ...newMap,
        ...getShopMap(children, key),
      };
    }
  });
  return newMap;
};

const setIsBind = (array, map) => {
  array.forEach((item) => {
    const shop = map[item];
    if (shop) {
      shop.isBind = 1;
    }
  });
};

export default modelExtend(pageModel, {
  namespace: 'receiptShop',
  state: {
    accId: '', // 账户id
    loading: false,
    selectedRows: [], // table选中的行
    searchInfo: '', // 搜索关键字
    modalVisible: false, // 弹窗
    modalKey: getKey(),
    shopData: [],  // 组织机构树
    shopIdMap: {}, // 门店MAP
    checkedShopIds: [], // 已选择的treeNode
    checkedShops: [], // 已选择的treeNode
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname;
        const re = pathToRegexp('/system/set/receiptAccount/shop/:accId');// 有冒号
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
      const { pagination,
        searchInfo,
        accId } = yield select(state => state.receiptShop);
      const params = {
        size: pagination.pageSize,
        current: pagination.current,
        keyword: searchInfo,
        accId,
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
    // 绑定
    * bind({ payload }, { call, put, select }) {
      const { accId } = yield select(state => state.receiptShop);
      const params = {
        accId,
        shops: payload,
      };
      const res = yield call(bind, parse(params));
      const { code } = res.data;
      if (code === '200') {
        message.success('绑定成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'hideModal',
        });
        yield put({
          type: 'updateState',
          payload: {
            checkedShopIds: [],
          },
        });
      }
    },
    // 取消绑定
    * unbind({ payload }, { call, put, select }) {
      const { accId } = yield select(state => state.receiptShop);
      const params = {
        accId,
        ...payload,
      };
      const res = yield call(unbind, parse(params));
      const { code } = res.data;
      if (code === '200') {
        message.success('解绑成功');
        yield put({
          type: 'query',
        });
      }
    },
    // 批量取消绑定
    * unbindAll({ payload }, { call, put, select }) {
      const { accId } = yield select(state => state.receiptShop);
      const params = {
        accId,
        shops: payload,
      };
      const res = yield call(unbindAll, parse(params));
      const { code } = res.data;
      if (code === '200') {
        message.success('解绑成功');
        yield put({
          type: 'query',
        });
        yield put({
          type: 'updateState',
          payload: {
            selectedRows: [],
          },
        });
      }
    },
    // 获取列表
    * queryStores({ payload }, { call, put }) {
      const params = {
        ...payload,
      };
      const res = yield call(inquireStores, parse(params));
      const { data, code } = res.data;
      if (code === '200') {
        const res2 = yield call(inquireBinds);
        const { data: data2, code: code2 } = res2.data;
        if (code2 === '200') {
          const shops = data || [];
          const map = getShopMap(shops, 'bohCode');
          setIsBind(data2 || [], map);
          yield put({
            type: 'updateState',
            payload: {
              shopData: shops,
              shopIdMap: map,
            },
          });
          yield put({
            type: 'showModal',
          });
        }
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
  },
});
