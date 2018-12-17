import { message } from 'antd';
import { parse } from 'qs';
import { inquireBusinessDetail, updateBusiness, sendSmsVerificationCode } from '../../services/system/businessInfo';
import { inquireProvinceList, inquireAreaListByParentId } from '../../services/app';
import { getSession } from '../../utils/index';


export default {
  namespace: 'businessInfo',
  state: {
    count: 0,
    status: '',     // 状态
    tenProvinceList: [], // 省列表
    tenCityList: [],     // 城市列表
    tenDistrictList: [], // 区县列表
    tenProvince: null, // 省
    tenCity: null,     // 城市
    tenDistrict: null, // 区县
    braLogo: '',
    superMobile: '',
    tenEmail: '',
    superName: '',
    verificationCode: '',
    tenAddress: '',
    tenCityName: '',
    tenDistrictName: '',
    tenProvinceName: '',
    tenName: '',
    fileList: [], // 图片
    previewImgUrl: null,
    previewVisible: false,
    userAccount: '',
    getsuperMobile: '', // 用来判断商户资料页面手机号是否修改
    isSuper: '0',
    // modal 中的属性
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    modalKey: null,
    modalError: false,
    modalErrorValue: null,
    treeData: [],
    treeOption: {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    },
    phoneNumber: '',
    newSuper: '', // 新管理员姓名
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/set/businessInfo') {
          // 取得是否登录变量
          const isLogin = getSession('isLogin');
          // 请求相关信息
          if (isLogin && isLogin === 'yes') {
            dispatch({
              type: 'queryBusinessDetail',
              payload: {
                // id: '1',
              },
            });
            dispatch({
              type: 'queryProvinceList',
            });
          }
        }
      });
    },
  },

  effects: {
    // 获取详细信息
// eslint-disable-next-line complexity
    * queryBusinessDetail({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireBusinessDetail, parse(payload));
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            braLogo: data.braLogo || '',
            tenName: data.tenName || '',
            superName: data.superName || '',
            superMobile: data.superMobile || '',
            tenDistrictName: data.tenDistrictName || '',
            tenProvinceName: data.tenProvinceName || '',
            tenCityName: data.tenCityName || '',
            tenAddress: data.tenAddress || '',
            tenEmail: data.tenEmail || '',
            status: data.status || '',
            tenDistrict: data.tenDistrict || null,
            tenProvince: data.tenProvince || null,
            tenCity: data.tenCity || null,
            getsuperMobile: data.superMobile || '',
            isSuper: data.isSuper || '0',
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            fileList: data.braLogo ? [{
              uid: -1,
              status: 'done',
              url: data.braLogo,
            }] : [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 保存
    * editBusiness({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(updateBusiness, parse(payload));
      const { superMobile, superName } = payload;
      const { code } = res.data;
      if (code === '200') {
        message.success('资料更新成功');
        yield put({
          type: 'querySuccess',
          payload: {
            verificationCode: '',
            tenProvinceList: [], // 省列表
            tenCityList: [],     // 城市列表
            tenDistrictList: [], // 区县列表
            modalVisible: false,
            loading: false,
            superMobile,
            superName,
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取省信息
    * queryProvinceList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquireProvinceList);
      const { data, code } = res.data;
      if (code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            tenProvinceList: data || [],
          },
        });
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取地区下一级
    * queryAreaListByParentId({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const flag = payload.flag;
      const reqParams = {
        parentId: payload.parentId,
      };
      const res = yield call(inquireAreaListByParentId, parse(reqParams));
      const { data, code } = res.data;
      if (flag === 'provinceClick') {
        if (code === '200') {
          yield put({
            type: 'querySuccess',
            payload: {
              tenCityList: data || [],
            },
          });
        }
        yield put({ type: 'hideLoading' });
      } else if (flag === 'cityClick') {
        if (code === '200') {
          yield put({
            type: 'querySuccess',
            payload: {
              tenDistrictList: data || [],
            },
          });
        }
        yield put({ type: 'hideLoading' });
      }
    },
    // 获取手机验证码
    * sendSmsVerificationCode({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield call(sendSmsVerificationCode, parse(payload));
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
      };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};

