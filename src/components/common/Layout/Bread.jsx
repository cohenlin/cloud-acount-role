import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Form, Select } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './Bread.less';
import { queryArray } from '../../../utils';

const Option = Select.Option;

const Bread = ({
     menu,
     location,
     MWTenantList,
     MWTenantSelected,
     onSelectTenant,
     form: {
       getFieldDecorator,
     },
   }) => {
  // 是否美味应用
  const isMWApp = location.pathname.startsWith('/appPacks/mwCRM/') ||
    location.pathname.startsWith('/appPacks/mwQueue/') || location.pathname.startsWith('/appPacks/mwOrdain/');
  // 匹配当前路由
  const pathArray = [];
  let current;
  menu.map((item) => {
    if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
      current = item;
    }
    return null;
  });
  const mwTenantOptions = MWTenantList.map(item =>
    <Option value={item.meiwei_pid} key={item.meiwei_pid}>{item.meiwei_pname}</Option>);
  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'));
    }
  };

  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    });
    pathArray.push({
      id: 404,
      name: 'Not Found',
    });
  } else {
    getPathArray(current);
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.name}</span>
    );
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item.route}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb separator=">">
        {breads}
      </Breadcrumb>
      {/* 美味商户选择 */}
      { isMWApp && <Form layout="inline" className={styles.form}>
        <Form.Item label="选择商户">
          { getFieldDecorator('MWTenantSelected', {
            initialValue: MWTenantSelected || '请选择商户',
          })(
            <Select
              style={{ width: 160 }}
              onChange={onSelectTenant}
            >
              {mwTenantOptions}
            </Select>,
        )}
        </Form.Item>
      </Form>}
    </div>
  );
};

Bread.propTypes = {
  MWTenantSelected: PropTypes.string,
  menu: PropTypes.array,
  MWTenantList: PropTypes.array,
  location: PropTypes.object,
  form: PropTypes.object,
  onSelectTenant: PropTypes.func,
};

export default Form.create()(Bread);
