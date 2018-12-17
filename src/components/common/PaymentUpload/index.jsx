/**
 * Create by liukang on 2018/03/07
 * */
import React, { PropTypes } from 'react';
import { Button, Row, Col, message } from 'antd';
import styles from './index.less';

const { warning } = message;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fileName: '',
    };
  }

  onClickUpload() {
    this.fileInput.click();
  }
  onSelectedFile(e) {
    if (e.target.files.length <= 0) return;
    const file = e.target.files[0];
    if (!/^.*?\.(pem|p12)$/.test(file.name)) {
      message.warning('文件格式不正确！');
      return;
    }
    if (file.size > 10 * 1024) {
      message.warning('文件大小不能超过10K');
      return;
    }
    this.setState({
      loading: true,
      fileName: file.name,
    });
    const reader = new window.FileReader();
    reader.onload = (event) => {
      this.onSucceed(event.target.result);
    };
    reader.onerror = () => {
      this.onFailed();
    };
    reader.readAsDataURL(file);
  }
  onSucceed(result) {
    if (this.props.onSucceed) { this.props.onSucceed(result); }
    this.setState({
      loading: false,
    });
  }
  onFailed() {
    warning('文件加载失败！');
    if (this.props.onFailed) { this.props.onFailed(); }
    this.setState({
      loading: false,
      fileName: '',
    });
  }
  render() {
    return (
      <div className={styles.upload}>
        <Row>
          <input
            ref={(input) => { this.fileInput = input; }}
            type="file"
            style={{ display: 'none' }}
            onChange={e => this.onSelectedFile(e)}
          />
          <Col span={10}>
            <Button loading={this.state.loading} icon="upload" onClick={e => this.onClickUpload(e)}>{this.props.btnText || '上传文件'}</Button>
          </Col>
          <Col span={14}>
            <p className={styles.detail}>{this.props.detail ? this.props.detail() : ''}</p>
          </Col>
          {
            this.state.fileName &&
            <Col span={24}>
              <p className={styles.name}>已选文件: {this.state.fileName}</p>
            </Col>
          }
        </Row>
      </div>
    );
  }
}

Upload.propTypes = {
  onFailed: PropTypes.func,
  onSucceed: PropTypes.func,
  btnText: PropTypes.string,
  detail: PropTypes.func,
};

export default Upload;
