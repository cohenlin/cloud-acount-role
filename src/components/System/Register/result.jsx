/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button } from 'antd';
import { Link } from 'dva/router';
import styles from '../../../common/Register.less';

const result = ({
  className,
  title,
  count,
 }) => {
  const clsString = classNames(styles.result, className);
  return (
    <div className={clsString} style={{ marginTop: 56 }}>
      <div className={styles.icon}><Icon className={styles.success} type="check-circle" /></div>
      <div className={styles.title}> <div className={styles.title}>{title}</div></div>
      <div className={styles.description}>{`页面将在${count}秒后跳转`}</div>
      <div className={styles.actions}>
        <Link to="/register"><Button size="large">返回首页</Button></Link>
      </div>
    </div>
  );
};

result.propTypes = {
  className: PropTypes.object,
  title: PropTypes.string,
  count: PropTypes.number,
};

export default result;
