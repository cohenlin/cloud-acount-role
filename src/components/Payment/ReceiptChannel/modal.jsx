/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Col, Row, Modal, message } from 'antd';
import ProviderForm from './forms/index';

const modal = ({
                 item,
                 visible,
                 onConfirm,
                 onCancel,
                 form,
                 onItemChange,
}) => {
  const {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  } = form;
  const providerFormProps = {
    getFieldDecorator,
    item,
    onItemChange,
  };
  const modalProps = {
    maskClosable: false,
    width: 600,
    title: `${item.channelName || ''}配置`,
    visible,
    cancelText: '取消',
    okText: '保存',
    onOk() {
      validateFields((errors) => {
        if (errors) {
          return;
        }
        const {
          certificateFile,
          ...setting
        } = getFieldsValue();
        const {
          type,
          isvId,
          aggCode,
          certificate,
          id,
          channelCode,
        } = item;
        if (!certificate && certificateFile) {
          message.warning('请上传证书！');
          return;
        }
        const data = {
          id,
          type,
          channelCode,
          isvId,
          aggCode,
          setting: JSON.stringify(setting),
          certificate,
        };
        onConfirm('edit', data);
      });
    },
    onCancel,
  };
  return (
    <Modal {...modalProps}>
      <Form style={{ marginTop: 20 }}>
        <Row>
          <Col span={24}>
            <ProviderForm {...providerFormProps} />
          </Col>
        </Row>
        <Row />
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
  onItemChange: PropTypes.func,
};

export default Form.create()(modal);
