/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Input, Col, Row, Modal } from 'antd';

const FormItem = Form.Item;

const modal = ({
                 item,
                 visible,
                 onConfirm,
                 onCancel,
                 form,
}) => {
  const {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  } = form;
  const FormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const modalProps = {
    maskClosable: false,
    width: 500,
    title: item.id ? '编辑账户' : '新增账户',
    visible,
    cancelText: '取消',
    okText: '保存',
    onOk() {
      validateFields((errors) => {
        if (errors) {
          return;
        }
        const data = getFieldsValue();
        const id = item.id;
        if (id) {
          data.id = id;
          onConfirm('edit', data);
        } else {
          onConfirm('add', data);
        }
      });
    },
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };
  return (
    <Modal {...modalProps}>
      <Form style={{ marginTop: 20 }}>
        <Row>
          <Col span={24}>
            <FormItem label="账户别名" {...FormItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [{
                  message: '请输入账户别名！',
                  required: true,
                }, {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,32}$/, message: '请输入1-32位字符！',
                }],
              })(
                <Input type="text" />,
              )}
            </FormItem>
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
};

export default Form.create()(modal);
