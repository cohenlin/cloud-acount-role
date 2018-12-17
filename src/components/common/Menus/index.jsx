import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { arrayToTree, queryArray } from '../../../utils';

const location = window.location;

const Menus = ({
   siderFold,
   darkTheme,
   navOpenKeys,
   changeOpenKeys,
   menu,
   menuType,
}) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid');
  const levelMap = {};

  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN) => menuTreeN.map((item) => {
    if (item.children) {
      if (item.mpid) {
        levelMap[item.id] = item.mpid;
      }
      return (
        <Menu.SubMenu
          key={item.id}
          title={<span>
            {item.icon && <i className={`iconfont ${item.icon}`} />}
            {(!siderFoldN || !menuTree.includes(item)) && item.name}
          </span>}
        >
          {getMenus(item.children, siderFoldN)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={item.route} style={{ fontSize: '14px' }}>
          {item.icon && <i className={`iconfont ${item.icon}`} /> }
          {(!siderFoldN || !menuTree.includes(item)) && item.name}
        </Link>
      </Menu.Item>
    );
  });
  const menuItems = getMenus(menuTree, siderFold);

  // 保持选中
  const getAncestorKeys = (key) => {
    const map = {};
    const getParent = (index) => {
      const result = [String(levelMap[index])];
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0]);
      }
      return result;
    };
    Object.keys(levelMap).map((index) => {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index);
      }
      return null;
    });
    return map[key] || [];
  };

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key));
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  };

  const menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {};


  // 寻找选中路由
  let currentMenu;
  let defaultSelectedKeys;
  const re = /^#(.*?)\?/;
  const match = location.hash.match(re);
  if (match) {
    menu.map((item) => {
      if (item.route && pathToRegexp(item.route).exec(match[1])) {
        currentMenu = item;
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
  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menu, currentMenu, 'mpid', 'id');
  }
  let menuDom;
  const onClickMenu = () => {
    window.menuScroll = menuDom.childNodes[0].scrollTop;
  };
  return (
    <div
      className="page-side-menu" ref={(e) => {
        const menuNode = e;
        menuDom = e;
        if (menuNode) {
          menuNode.childNodes[0].scrollTop = window.menuScroll || 0;
        }
      }}
    >
      <Menu
        {...menuProps}
        mode={siderFold ? 'vertical' : 'inline'}
        theme={darkTheme ? 'dark' : 'light'}
        onClick={onClickMenu}
        defaultSelectedKeys={defaultSelectedKeys}
        key={menuType.join('/')}
      >
        {menuItems}
      </Menu>
    </div>
  );
};

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  menuType: PropTypes.array,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Menus;
