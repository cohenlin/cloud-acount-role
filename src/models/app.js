/* eslint-disable max-depth */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { getMenuTree } from '../services/app';
import { inquireContactList, setCurrentTenant } from '../services/system/personal';
import { inquireAppAuth, inquireMWTenant } from '../services/appPacks/common';
import { saveSession, getSession, config, toJson, toStr } from '../utils/index';
// import BusinessInfo from '../routes/system/BusinessInfo';

const { prefix } = config;
const localStorage = window.localStorage;
const document = window.document;
const winWidth = window.innerWidth || document.documentElement.clientWidth
                  || document.body.clientWidth;


export default {
  namespace: 'account',
  state: {
    user: {
      username: getSession('username') || '',
    },
    isLogin: false,
    isIframe: false,
    systemMenu: [],
    permissions: {
      visit: {
        personal: ['1', '2', '3'],
      },
    },
    firstMenu: {},
    menuType: [],
    menu: {
      personal: [
        {
          id: '1',
          icon: 'icon-cho-datum',
          name: '基础资料',
          route: '/system/personal/baseInfo',
        },
        {
          id: '2',
          icon: 'icon-cho-lock',
          name: '修改密码',
          route: '/system/personal/password',
        },
        {
          id: '3',
          icon: 'icon-cho-job',
          name: '我工作的商家',
          route: '/system/personal/myBusiness',
        },
      ],
    },
    buttonPermissions: {},
    isPersonal: false, // 是否是个人中心
    isSelectedTenant: false, // 是否已经选择商家
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: false, // 风格定为深色
    isNavbar: winWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    contactList: [],
    contactBtn: true,
    contactBtnName: '切换商家',
    personalBtnStatus: true,
    postArray: [
      { code: 9, name: '总部管理员' },
      { code: 5, name: '门店管理员' },
      { code: 1, name: '门店员工' },
    ], // 员工设置页面弹窗权重值
    // 美味商户列表及授权
    MWTenantList: [],
    MWTenantListKey: null,
    MWTenantSelected: null,
    authType: null,
    authCode: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 取得是否登录变量
      const isLogin = getSession('isLogin');
      // 请求菜单按钮相关信息,页面刷新的时候应该重新请求到
      if (isLogin && isLogin === 'yes') {
        dispatch({
          type: 'reloadMenu',
          payload: {},
        });
      }
      history.listen((location) => {
        // 取得路由标识
        dispatch({
          type: 'updateState',
          payload: {
            menuType: location.pathname.split('/'),
          },
        });
        // 是否是应用系统
        if (location.pathname.startsWith('/application')) {
          dispatch({
            type: 'updateState',
            payload: {
              isIframe: true,
            },
          });
        } else if (location.pathname.startsWith('/system') || location.pathname.startsWith('/appMart')) {
          dispatch({
            type: 'updateState',
            payload: {
              isIframe: false,
            },
          });
        }
        // 如果当前路由是美味会员、美味排队、美味预定，那么请求应用授权信息跟美味商户信息
        if (location.pathname.startsWith('/appPacks/mwCRM/') || location.pathname.startsWith('/appPacks/mwOrdain/') || location.pathname.startsWith('/appPacks/mwQueue/')) {
          // 获取应用授权信息
          dispatch({
            type: 'queryAppAuth',
          });
          // 获取美味商户列表
          dispatch({
            type: 'queryMWTenant',
          });
        }
      });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({
            type: 'autoSwitchSider',
          });
        }, 300);
      };
    },
  },
  effects: {
    * queryContactList({ payload = {} }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireContactList, parse(payload));
      const { data, code, msg } = res.data;
      if (code === '200') {
        message.success('登录成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            contactList: data || [],
            isSelectedTenant: msg === 'selectedTenant',
          },
        });
        switch (data.length) {
          case 0:
            yield put({
              type: 'updateState',
              payload: {
                contactBtn: false,
                personalBtnStatus: true,
              },
            });
            yield put(routerRedux.push('/system/personal/baseInfo'));
            break;
          case 1:
            yield put({
              type: 'updateState',
              payload: {
                contactBtnName: '查看商家',
              },
            });
            // 请求菜单按钮相关信息
            yield put({
              type: 'getMenu',
            });
            break;
          default:
            yield put({
              type: 'updateState',
              payload: {
                contactBtn: true,
                personalBtnStatus: false,
              },
            });
            // 判断如果没有已选商家，则跳转到选择商家页面
            if (msg !== 'selectedTenant') {
              yield put(routerRedux.push('/system/personal/myBusiness'));
            } else if (msg === 'selectedTenant') { // 如果有已选商家，那么请求当前菜单
              // 请求菜单按钮相关信息
              yield put({
                type: 'getMenu',
              });
            }
            break;
        }
      }
      yield put({ type: 'hideLoading' });
    },
    * setCurrentTenant({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(setCurrentTenant, parse(payload));
      const { code } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            contactList: [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 登陆检测
    * checkLogin() {
      const isLogin = yield getSession('isLogin');
      if (!isLogin || isLogin === 'no') {
        window.location = `${window.location.origin}/index.html#/system/cloud/home`;
      }
    },
    // 获取菜单测试
    * getMenu({ payload }, { call, put, select }) {
      const menuCache = yield select(state => state.account.menu);
      const visitCache = yield select(state => state.account.permissions.visit);
      const res = yield call(getMenuTree, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        if (data && data.firstMenu) {
          yield put({
            type: 'updateState',
            payload: {
              firstMenu: data.firstMenu,
              menu: { ...menuCache, ...data.secondMenu },
              permissions: {
                visit: { ...visitCache, ...data.pageVisit },
              },
              buttonPermissions: data.buttonPermissions,
            },
          });
          // 把菜单存入session中
          saveSession('cloudMenuTree', toStr(data));
          // 登录成功进入页面为第一个一级菜单内第一个元素
          if (data.firstMenu.appPacks && data.firstMenu.appPacks.length > 0) {   //  左侧一级菜单
            yield put(routerRedux.push(data.firstMenu.appPacks[0].route));
          } else if (data.firstMenu.system && data.firstMenu.system.length > 0) {
            yield put(routerRedux.push(data.firstMenu.system[0].route));
          } else {
            yield put(routerRedux.push('/system/personal/baseInfo'));
          }
        } else {
          yield put(routerRedux.push('/system/personal/baseInfo'));
        }
      }
    },
    // 从缓存里读取菜单
    * reloadMenu({ payload }, { put, select }) {
      const menuCache = yield select(state => state.account.menu);
      const visitCache = yield select(state => state.account.permissions.visit);
      const dataList = toJson(getSession('cloudMenuTree'));
      // 如果缓存中的cloudMenuTree不为空，那么就执行更新菜单操作
      if (dataList) {
        yield put({
          type: 'updateState',
          payload: {
            firstMenu: dataList.firstMenu,
            menu: { ...menuCache, ...dataList.secondMenu },
            permissions: {
              visit: { ...visitCache, ...dataList.pageVisit },
            },
            buttonPermissions: dataList.buttonPermissions,
          },
        });
      }
    },
    // 获取应用授权信息
    * queryAppAuth({ payload }, { call, put }) {
      const res = yield call(inquireAppAuth);
      const { code, data, msg } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            authType: msg,
            authCode: data,
          },
        });
      }
    },
    // 获取美味商户信息
    * queryMWTenant({ payload }, { call, put }) {
      const res = yield call(inquireMWTenant);
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            MWTenantList: data || [],
            MWTenantSelected: data.length > 0 ? data[0].meiwei_pid : null,
          },
        });
        // 重新渲染商户列表，通过改变key值达到
        yield put({
          type: 'changeMWTenantListKey',
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
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeMWTenantListKey(state) {
      return {
        ...state,
        MWTenantListKey: Date.parse(new Date()) / 1000,
      };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },
    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },
    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      };
    },
    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
    autoSwitchSider(state) {
      const siderFold = document.body.clientWidth < 769;
      if (siderFold) {
        localStorage.setItem(`${prefix}siderFold`, siderFold);
        return {
          ...state,
          siderFold,
        };
      }
      return state;
    },
  },
};
