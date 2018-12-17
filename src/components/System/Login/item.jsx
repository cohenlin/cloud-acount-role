import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default function Result() {
  return (
    <div className={styles.login}>
      <div className={styles.icon}><Spin size="large" /></div>
    </div>
  );
}
