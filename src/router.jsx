import React, { PropTypes } from 'react';
import { Router } from 'dva/router';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './routes/App';

function RouterConfig({ history, routes, dispatch }) {
  const router = [
    {
      path: '/',
      name: 'app',
      component: App,
      indexRoute: { onEnter: (nextState, replace) => replace('/system/cloud/home') },
      onEnter(nextState) {
        const { pathname } = nextState.location;
        if (pathname !== '/' && pathname !== '/system/cloud/register' && pathname !== '/system/cloud/registerResult' && pathname !== '/system/cloud/forgetPassword' && pathname !== '/system/cloud/forgetPasswordResult') {
          dispatch({
            type: 'account/checkLogin',
          });
        }
      },
      childRoutes: routes,
    },
  ];
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history} routes={router} />
    </LocaleProvider>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  routes: PropTypes.array,
  dispatch: PropTypes.func,
};
export default connect()(RouterConfig);
