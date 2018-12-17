/**
 * Created by Wangtaidong on 2017/12/22.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import BindAccount from '../../../routes/payment/BindAccount';

const modal = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const modalProps = {
    visible,
    onCancel,
    width: 500,
    onOk() {
      onConfirm();
    },
    okText: '确定',
    cancelText: '取消',
    maskClosable: false,
    title: '查看门店',
    wrapClassName: 'vertical-center-modal',
    style: {
      textAlign: 'center',
    },
  };
  return (
    <div>
      <Modal {...modalProps}>
        <BindAccount />
      </Modal>
    </div>
  );
};
modal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default modal;
