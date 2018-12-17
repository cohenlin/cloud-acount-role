import React, { PropTypes } from 'react';
import { Layout, Row, Col, Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from '../../../common/home.less';
import { logo } from './homeImages';


const { Header } = Layout;
const MenuItem = Menu.Item;

const header = ({ dispatch }) => {
  const handleClick = (e) => {
    if (e.key === '2') {
      window.open('http://www.choicesoft.com.cn/');
    } else if (e.key === '3') {
      const footer = window.document.getElementById('footer');
      footer.scrollIntoView();
    } else if (e.key === '1') {
      dispatch(routerRedux.push('/system/cloud/home'));
    }
  };
  // const headerToWhile = () => {
  // };
  return (
    <Header className={styles.header}>
      <div className={styles.headerBox}>
        <Row>
          <Col span={10}>
            <div id={styles.logo} >
              <a href="/">
                <img src={logo} alt="" />
              </a>
            </div>
          </Col>
          <Col span={14}>
            {/* 头部菜单 */}
            <Menu
              onClick={handleClick}
              className={styles.menu}
              mode="horizontal"
            >
              <MenuItem className={styles.item} key={1}>首页</MenuItem>
              <MenuItem className={styles.item} key={2}>辰森官网</MenuItem>
              <MenuItem className={styles.item} key={3}>客户专线<Icon type="phone" />400-810-0167</MenuItem>
            </Menu>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

header.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(header);

