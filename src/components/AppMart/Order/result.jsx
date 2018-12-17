/* CREATE BY lumingming 2018/02/08 下午15:55:16*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Button } from 'antd';
import styles from '../../../common/result.less';


const result = ({ className, payType, onToApp, onView }) => {
  const iconMap = {
    success: <Icon className={styles.success} type="check-circle" />,

  };
  const title = '订购成功！';
  const clsString = classNames(styles.result, className);
  const free = (
    <div>
      <div className={styles.icon}>{iconMap.success}</div>
      <div className={styles.title}>{title}</div>
      <Button style={{ marginRight: 15 }} onClick={onToApp} >查看我的应用</Button> {/* //调至myApp*/}
      <Button onClick={onView}>查看订单</Button>{/* //调至订单详情页*/ }
    </div>
  );
  const payed = (
    <div>
      <div className={styles.icon}>{iconMap.success}</div>
      <p>您的订单已提交，等待管理员处理，请您等待结果</p>
      <Button onClick={onView}>查看订单</Button>
    </div>
  );
  return (
    <div className={clsString}>
      {payType === 'pay' ? payed : free}
    </div>
  );
};
result.propTypes = {
  className: PropTypes.object,
  onToApp: PropTypes.func,
  onView: PropTypes.func,
  payType: PropTypes.string,
};
export default result;
