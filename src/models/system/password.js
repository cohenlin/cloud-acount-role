import { parse } from 'qs';
import { message } from 'antd';
import { updatePassword } from '../../services/system/personal';
import { getSession } from '../../utils/index';

export default {
  namespace: 'password',
  state: {
    id: '',
    oldUserPass: '',
    firstNewUserPass: '',
    secondNewUserPass: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/personal/password') {
          // 取得是否登录变量
          const isLogin = getSession('isLogin');
          // 请求相关信息
          if (isLogin && isLogin === 'yes') {
            dispatch({ // 设置是否是个人中心，用来控制左侧菜单
              type: 'account/updateState',
              payload: {
                isPersonal: true,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * editPassword({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const {
        oldUserPass, firstNewUserPass, secondNewUserPass,
      } = yield select(state => state.password);
      const reqParams = {
        id: '40269124-7E41-CCA3-BFFD-EAA4B9C3DA84',
        oldUserPass: payload.oldUserPass || oldUserPass,
        firstNewUserPass: payload.firstNewUserPass || firstNewUserPass,
        secondNewUserPass: payload.secondNewUserPass || secondNewUserPass,
      };
      const res = yield call(updatePassword, parse(reqParams));
      const { code } = res.data;
      if (code === '200') {
        message.success('密码修改成功');
        yield put({
          type: 'querySuccess',
        });
      }
      yield put({ type: 'hideLoading' });
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) { return { ...state, ...action.payload, loading: false }; },

  },
};
