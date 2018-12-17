/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Checkbox, Col, Row, Modal } from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const modal = ({
                 visible,
                 onConfirm,
                 onCancel,
                 channel,
                 selectedChannel,
                 onChannelChange,
}) => {
  const FormItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const modalProps = {
    maskClosable: false,
    width: 500,
    title: '配置渠道',
    visible,
    cancelText: '取消',
    okText: '保存',
    onOk() {
      onConfirm();
    },
    onCancel,
  };
  return (
    <Modal {...modalProps}>
      <Form>
        <Row>
          <Col span={16} offset={4}>
            <FormItem label="开通渠道::" {...FormItemLayout}>
              <CheckboxGroup style={{ width: '100%' }} value={selectedChannel} onChange={e => onChannelChange(e)}>
                <Row>
                  {
                    channel.map(it =>
                      <Col span={12} key={it.code} style={{ marginTop: '10px' }}>
                        <Checkbox value={it.code}>{it.name}</Checkbox>
                      </Col>,
                    )
                  }
                </Row>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>
        <Row />
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  channel: PropTypes.array,
  onChannelChange: PropTypes.func,
  selectedChannel: PropTypes.array,
};

export default Form.create()(modal);
