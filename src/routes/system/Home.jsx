/**
 * Created by Wangtaidong on 2017/12/29.
 */
import React, { PropTypes } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import config from '../../utils/config';
import styles from '../../common/home.less';

const { Content } = Layout;

const Home = () => (
  <Layout className={styles.layout}>
    <Content className={styles.content}>
      <iframe
        className={styles.iframe}
        src="/home/index.html"
        frameBorder="0"
      />
      {/* 报表登出操作 */}
      <iframe src={`${config.domainReport}logout`} height={0} frameBorder="0" />
    </Content>
  </Layout>
  );

Home.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Home);
