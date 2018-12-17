import React, { PropTypes } from 'react';
import { Tag, Card, Button, Col, Row, Spin, Icon } from 'antd';
import classNames from 'classnames';
import styles from '../../../common/result.less';

const myBusiness = ({
     className,
     loading,
     contactList,
     onContact,
  }) => {
  const contactListProps = data => data.map(item =>
    (<Col span={6} key={item.id} style={{ marginBottom: 15 }}>
      <Card hoverable actions={[<Button type="primary" ghost disabled={item.isCurrentTenant === 1} onClick={onContact} value={item.id}>进入商家</Button>]} cover={<div style={{ textAlign: 'center', height: 100, backgroundImage: `url(${item.braLogo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />}>
        <p className="contactName" title={item.tenName}>{item.tenName}</p>
        <p className="postName"><span>{item.post}</span></p>
        {item.isCurrentTenant === 1 && <Tag color="green" className="nowContact">当前商家</Tag>}</Card>
    </Col>));
  const clsString = classNames(styles.result, className);
  return (
    <div className="Personal">
      <Row gutter={16}>
        <Spin spinning={loading} size="large" style={{ position: 'absolute', top: '50%', left: '46%' }} />
        {contactListProps(contactList)}
      </Row>
      {contactList.length === 0 &&
      <div className={clsString} style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className={styles.icon}><Icon className={styles.description} type="warning" /></div>
        <div className={styles.title}>当前无可用商户！</div>
      </div>}
    </div>
  );
};

myBusiness.propTypes = {
  onContact: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.object,
  contactList: PropTypes.array,
};

export default myBusiness;
