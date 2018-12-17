import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';
import { arrayToTree, queryArray } from '../../../utils';

const Header = ({
      user,
      logout,
      location,
      firstMenu,
      changePersonalStatus,
      onChangePersonal,
}) => {
  // 菜单级别
  const levelMapSystem = {};
  const levelMapApp = {};
  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN, menuType) => menuTreeN.map((item) => {
    if (item.children) {
      if (item.mpid) {
        if (menuType === 'system') {
          levelMapSystem[item.id] = item.mpid;
        } else if (menuType === 'app') {
          levelMapApp[item.id] = item.mpid;
        }
      }
      return (
        <Menu.SubMenu
          key={item.id}
          title={<span>
            {item.icon && <Icon type={item.icon} />}
            {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
          </span>}
        >
          {getMenus(item.children, siderFoldN)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={item.route}>
          {item.icon && <Icon type={item.icon} />}
          {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
        </Link>
      </Menu.Item>
    );
  });
  // 生成系统菜单
  const menuSystem = firstMenu.system ? arrayToTree(firstMenu.system.filter(_ => _.mpid !== '-1'), 'id', 'mpid') : [];
  const menuSystemItems = getMenus(menuSystem, false, 'system');
  const menuApp = firstMenu.appPacks ? arrayToTree(firstMenu.appPacks.filter(_ => _.mpid !== '-1'), 'id', 'mpid') : [];
  const menuAppItems = getMenus(menuApp, false, 'app');
  // 定义报表链接
  const handleClickMenu = (e) => {
    if (e.key === 'logout') {
      logout();
    }
    if (e.key === 'personal') {
      // 个人中心
    }
  };
  const onFirstMenuChange = (e) => {
    if (e.key === 'set') {
      onChangePersonal(); // 修改是否个人中心状态
    }
  };
  // 寻找选中路由
  let currentMenuSystem; // 定义系统当前菜单
  let currentMenuAppPacks; // 定义应用当前菜单
  let defaultSelectedKeysSystem;  // 定义系统默认选中
  let defaultSelectedKeysAppPacks;  // 定义应用默认选中
  const pathnameArray = location.pathname.split('/');
  if (pathnameArray.length > 3 && pathnameArray[2] !== 'personal') {
    firstMenu.system.map((item) => {
      const itemRouteArray = item.route.split('/');
      // 当前数组进行比较，比较前两位路径即可
      if (pathnameArray[1] === itemRouteArray[1] && pathnameArray[2] === itemRouteArray[2]) {
        currentMenuSystem = item;
      }
      return null;
    });
    firstMenu.appPacks.map((item) => {
      const itemRouteArray = item.route.split('/');
      // 当前数组进行比较，比较前两位路径即可
      if (pathnameArray[1] === itemRouteArray[1] && pathnameArray[2] === itemRouteArray[2]) {
        currentMenuAppPacks = item;
      }
      return null;
    });
  }
  const getPathArray = (array, current, pid, id) => {
    const result = [String(current[id])];
    const getPath = (item) => {
      if (item && item[pid]) {
        result.unshift(String(item[pid]));
        getPath(queryArray(array, item[pid], id));
      }
    };
    getPath(current);
    return result;
  };
// 计算出当前选中的数组
  if (currentMenuSystem) {
    defaultSelectedKeysSystem = getPathArray(firstMenu.system, currentMenuSystem, 'mpid', 'id');
  } else if (currentMenuAppPacks) {
    defaultSelectedKeysAppPacks = getPathArray(firstMenu.appPacks, currentMenuAppPacks, 'mpid', 'id');
  } else if (pathnameArray.length > 3 && pathnameArray[1] === 'system' && pathnameArray[2] === 'personal') {
    defaultSelectedKeysSystem = ['personal'];
  }

  const userMenu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="personal"><a rel="noopener noreferrer" onClick={changePersonalStatus} target="_self" href="#/system/personal/baseInfo"><i className="iconfont icon-cho-personal" /> 个人中心</a></Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout"><i className="iconfont icon-cho-exit" /> 退出登录</Menu.Item>
    </Menu>
  );
  const dropdownProps = {
    placement: 'bottomRight',
  };
  return (
    <div className={styles.header}>
      <div className={styles.leftLogo}><img src="./images/logo.png" alt="logo" /></div>
      <div className={styles.leftMenus}>
        <Menu
          onClick={onFirstMenuChange}
          selectedKeys={defaultSelectedKeysAppPacks}
          mode="horizontal"
          style={{ fontSize: 16, lineHeight: '64px' }}
        >
          { menuAppItems }
        </Menu>
      </div>
      <div className={styles.rightMenus}>
        <Menu mode="horizontal" selectedKeys={defaultSelectedKeysSystem} style={{ fontSize: 16, lineHeight: '64px' }}>
          { menuSystemItems }
        </Menu>
        <Dropdown overlay={userMenu} {...dropdownProps}>
          <div className={styles.user}>
            <div className={styles.divider} />
            {/* <div className={styles.avatar}>
              <img src="" alt="" />
            </div>*/}
            <div className={styles.info}>
              <p className={styles.name}>{user.username}</p>
              <p className={styles.store}>{}</p>
            </div>
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
  firstMenu: PropTypes.object,
  changePersonalStatus: PropTypes.func,
  onChangePersonal: PropTypes.func,
};


export default Header;
