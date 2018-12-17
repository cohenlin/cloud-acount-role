import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Card } from 'antd';
import NProgress from 'nprogress';
import { Helmet } from 'react-helmet';
import { Layout, Loader } from '../components';
import '../themes/index.less';
import Error from './error/index';
import { config, classnames } from '../utils';

const { prefix, openPages } = config;

const { Header, Bread, Sider, styles } = Layout;
let lastHref;

const App = ({
 children,
 dispatch,
 account,
 loading,
 location,
}) => {
  const {
    user,
    siderFold,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    menu,
    menuType,
    isPersonal,
    isIframe,
    permissions,
    firstMenu,
    MWTenantList,
    MWTenantListKey,
    MWTenantSelected,
  } = account;
  let { pathname } = location;
  // 根据menuType取得当前展示菜单跟permission
  let menuData = [];
  let permissionsArray;
  if (menuType.length > 2) {
    if (menuType[2] === 'cloud') {
      menuData = [];
      permissionsArray = [];
    } else if (menuType[2] === 'personal') {
      menuData = menu.personal;
      permissionsArray = permissions.visit.personal;
    } else {
      menuData = menu[menuType[1]][menuType[2]] || [];
      permissionsArray = permissions.visit[menuType[1]][menuType[2]] || [];
    }
  }
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const current = menuData.filter(item => pathToRegexp(item.route || '').exec(pathname));
  let hasPermission = false;
  if (pathname === '/' || pathname === '/system/cloud/home') {
    hasPermission = true;
  } else {
    hasPermission = current.length ? permissionsArray.includes(current[0].id) : false;
  }
  const href = window.location.href;


  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }
  const headerProps = {
    menu: menuData,
    firstMenu,
    isPersonal,
    location,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    logout() {
      // 退出主系统
      dispatch({
        type: 'login/logoutSystem',
        payload: {
          logoutMsg: '退出成功！',
        },
      });
    },
    checkLogin() {
      dispatch({ type: 'account/checkLogin' });
    },
    onChangePersonal() {
      dispatch({ // 设置是否是个人中心，用来控制左侧菜单
        type: 'account/updateState',
        payload: {
          isPersonal: false,
        },
      });
    },
    switchMenuPopover() {
      dispatch({ type: 'account/switchMenuPopver' });
    },
    switchSider() {
      dispatch({ type: 'account/switchSider' });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'account/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
    changePersonalStatus() {
      dispatch({
        type: 'account/updateState',
        payload: {
          personalBtnStatus: true,
        },
      });
    },
  };
  const siderProps = {
    menu: menuData,
    menuType,
    isPersonal,
    siderFold,
    darkTheme,
    navOpenKeys,
    isNavbar,
    menuPopoverVisible,
    changeTheme() {
      dispatch({ type: 'account/switchTheme' });
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: 'account/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
    switchMenuPopover() {
      dispatch({ type: 'account/switchMenuPopver' });
    },
    switchSider() {
      dispatch({ type: 'account/switchSider' });
    },
  };
  const breadProps = {
    menu: menuData,
    MWTenantList,
    MWTenantSelected,
    key: MWTenantListKey,
    location,
    onSelectTenant(value) {
      dispatch({
        type: 'account/updateState',
        payload: {
          MWTenantSelected: value,
        },
      });
    },
  };
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={false} />
      {children}
    </div>);
  }
  return (<div className="container-cloud">
    <Helmet>
      <title>辰森云平台</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <Header {...headerProps} />
    <div
      className={classnames(styles.layout,
        { [styles.fold]: siderFold })}
    >
      <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
        <Sider {...siderProps} />
      </aside>
      <div className={styles.main}>
        <Bread {...breadProps} />
        <div className={isIframe ? 'iframe-container' : 'div-container'}>
          <div className={styles.content}>
            <Card bordered={false}>
              {/* {children}*/}
              { hasPermission ? children : <Error /> }
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  account: PropTypes.object,
};

export default connect(({ account, loading }) => ({ account, loading }))(App);
