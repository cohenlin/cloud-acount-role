/**
 * Created by xiaochenghua on 2018/02/06.
 */
import { message } from 'antd';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { inquireApp, inquireShop, updateItemState } from '../../services/appMart/manage';

export default {
  namespace: 'manage',
  state: {
    loading: false,
    localId: null,
    name: '',
    state: 0,
    data: [{
      applicationName: '未发现应用',
      applicationIcon: '/',
      description: '未发现应用',
    }],
    dataSource: [],
    listPagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      size: '10',
      pageSizeOptions: ['10', '20', '50', '100'],
    },
    selectedItem: [], // 选中的商户
    selectedItemsId: [], // 选中商户的id
    selectedStop: [], // 可选下架的id
    selectedStart: [], // 可选上架的id
    startFlag: true,
    stopFlag: true,
    selectStatus: ' ',
    shopList: [],
    btnRole: 1, // 标识上架按钮
    visible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname;
        const re = pathToRegexp('/system/app/manage/:id');// 有冒号
        const match = re.exec(pathname);
        if (match) {
          const itemId = match[1];
          dispatch({
            type: 'queryAppItem',
            payload: {
              appIds: itemId,
            },
          });
          dispatch({
            type: 'queryShopList',
            payload: {
              appId: itemId,
            },
          });
          dispatch({
            type: 'updateState',
            payload: {
              localId: itemId,
              selectStatus: ' ',
              name: '',
            },
          });
        }
      });
    },
  },
  effects: {
    * queryAppItem({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireApp, parse(payload));
      const { code, data } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data || [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * queryShopList({ payload }, { put, call, select }) {
      yield put({ type: 'showLoading' });
      const oldPage = yield select(state => state.manage.listPagination);
      const res = yield call(inquireShop, parse(payload));
      const { code, data, page } = res.data;
      if (code === '200') {
        if (data) {
          data.map((item) => {
            const temp = item;
            temp.shopName = [temp.shopName, temp.shopid];
            return temp;
          });
        }
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data || [],
            listPagination: {
              ...oldPage,
              total: page.total || 0,
              current: page.pageno || 1,
              size: page.rowcount || '10',
            },
            selectedItem: [],
            selectedItemsId: [],
            selectedStop: [],
            selectedStart: [],
            startFlag: true,
            stopFlag: true,
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    * changeStatus({ payload }, { put, call, select }) {
      yield put({ type: 'showLoading' });
      const name = yield select(state => state.manage.name);
      const selectStatus = yield select(state => state.manage.selectStatus);
      const dataSource = yield select(state => state.manage.dataSource);
      const id = yield select(state => state.manage.localId);
      const page = yield select(state => state.manage.listPagination);
      const res = yield call(updateItemState, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        if (data) {
          yield put({
            type: 'showModal',
            payload: {
              shopList: data.map((val) => {
                // 根据shopid查询门店信息
                const sName = dataSource.filter(v => v.shopName[1] === val.id);
                return {
                  shopName: `${sName[0].shopName[0]}`,
                  appsTitle: `${sName[0].status === 0 ? '应用冲突' : '有依赖应用'}，请先下架 ${val.app.map(v => `[${v}] `)}应用`,
                };
              }),
            },
          });
        } else {
          message.success('操作成功！');
          yield put({
            type: 'querySuccess',
          });
          yield put({
            type: 'queryShopList',
            payload: {
              appId: id,
              name,
              status: selectStatus || '',
              page: {
                pageno: page.current,
                rowcount: page.size,
              },
            },
          });
        }
      }
      yield put({ type: 'hideLoading' });
    },
    * editStatus({ payload }, { put, select }) {
      const selectedItem = yield select(state => state.manage.selectedItem);
      const startArray = [];      // 可上架数组
      const blockArray = [];      // 可下架数组
      const judgeStartArray = selectedItem.filter(item => item.status === 0);
      const judgeBlockArray = selectedItem.filter(item => item.status === 1);
      const outTimeArray = selectedItem.filter(item => item.status === 2);
      judgeStartArray.map((item) => {
        startArray.push(item.id);
        return false;
      });
      judgeBlockArray.map((item) => {
        blockArray.push(item.id);
        return false;
      });
      yield put({
        type: 'updateState',
        payload: {
          stopFlag: (judgeStartArray.length + outTimeArray.length) === selectedItem.length,
          startFlag: (judgeBlockArray.length + outTimeArray.length) === selectedItem.length,
          selectedStop: blockArray,
          selectedStart: startArray,
        },
      });
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    hideModal(state) {
      return { ...state, visible: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, visible: true };
    },
  },
};
