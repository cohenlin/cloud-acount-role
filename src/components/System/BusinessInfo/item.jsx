/**
 * 2018/01/26  xiaochenghua changed style
 */
import React, { PropTypes } from 'react';
import { Form, Input, Button, Col, Row, Upload, Icon, Select, Modal } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const businessInfo = ({
     form: {
       getFieldDecorator,
       validateFields,
     },
     isSuper,
     businessButton,
     onBeforeUpload,
     onUpload,
     onRemove,
     tenProvinceName,
     tenCityName,
     tenDistrictName,
     onProvinceChange,
     onCityChange,
     onDistrictChange,
     onSubmit,
     tenProvinceList,
     tenCityList,
     tenDistrictList,
     superMobile,
     tenName,
     superName,
     tenEmail,
     tenAddress,
     braLogo,
     fileList,
     onPreview,
     onCancelPic,
     previewVisible,
     previewImgUrl,
     onReset,
   }) => {
  const FormItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 14 },
      xl: { span: 14 },
    },
  };
  const FormItemLayout1 = {
    wrapperCol: {
      xs: { offset: 4 },
      sm: { offset: 8 },
      md: { offset: 8 },
      lg: { offset: 6 },
      xl: { offset: 6 },
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
  const handle = file => ({
    ...file,
  });
  const provinceSelectProps = tenProvinceName && {
    value: tenProvinceName,
  };
  const citySelectProps = tenCityName && {
    value: tenCityName,
  };
  const districtSelectProps = tenDistrictName && {
    value: tenDistrictName,
  };
  const provinceOption = tenProvinceList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);
  const cityOption = tenCityList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);
  const districtOption = tenDistrictList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);

  const uploadProps = {
    action: '/api/tenant/upload',
    className: 'avatar-uploader',
    name: 'file',
    listType: 'picture-card',
    disabled: !(businessButton && businessButton.edit),
    beforeUpload: file => onBeforeUpload(file),
    fileList,
    onPreview,
    onChange: onUpload,
    onRemove,
    accept: 'image/jpeg, image/bmp, image/png, image/gif',
    data: handle,
  };
  const disabled = isSuper === '1' && businessButton && businessButton.edit;
  // const getVerCodeBtnStatus = getFieldValue('userAccount') === getsuperMobile ? true : count;
  const selectPosition = {
    getPopupContainer: () => window.document.getElementById('selectId'),
  };
  return (

    <div className="businessinfo">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={18} xl={14} id="selectId" >
            <FormItem
              {...FormItemLayout}
              label="商户名称"
            >
              {getFieldDecorator('tenName', {
                initialValue: tenName,
                rules: [{
                  message: '请输入商户名称！',
                  required: true,
                }, {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/,
                  message: '请输入2-20位中/英文或数字字符！',
                }],
              })(

                <Input type="text" className="businessinfoInput" disabled={!disabled} style={{ width: '100%' }} />,
              )}

            </FormItem>
            <FormItem
              className={styles['avatar-uploader']}
              {...FormItemLayout}
              label="商家logo"
            >
              <Upload
                {...uploadProps}
              >
                {
                  fileList.length < 1 && [
                    <Icon type="plus" style={{ fontSize: 20 }} key="icon" />,
                    <div key="upload" className="ant-upload-text">上传图片</div>,
                  ]
                }
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={onCancelPic} >
                <img style={{ width: '100%', paddingTop: 20 }} alt="商家logo" src={previewImgUrl} />
              </Modal>
              <div style={{ paddingTop: '0px' }}>
                <p style={{ fontSize: 12, color: '#bdbdbd', lineHeight: '14px', marginLeft: '108px' }}>图片大小不超过2M,图片尺寸(200x200),图片格式(gif,jpeg,bmp,png)</p>
              </div>
            </FormItem>
            <FormItem
              {...FormItemLayout}
              label="商户地址"
              required
            >
              {getFieldDecorator('braLogo', {
                initialValue: braLogo,
                // rules: [{ required: true, message: '请选择商户地址' }],
              })(<span className={styles.selectBox}>
                <Select {...selectPosition} className={styles.select} placeholder="省" {...provinceSelectProps} onSelect={onProvinceChange} disabled={!disabled}>
                  { provinceOption }
                </Select>
                <Select {...selectPosition} className={styles.select} placeholder="市" {...citySelectProps} onSelect={onCityChange} disabled={!disabled}>
                  { cityOption }
                </Select>
                <Select {...selectPosition} className={styles.select} placeholder="区" {...districtSelectProps} onSelect={onDistrictChange} disabled={!disabled}>
                  { districtOption }
                </Select>
              </span>)}
            </FormItem>
            <FormItem
              {...FormItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('tenAddress', {
                initialValue: tenAddress,
                rules: [
                  { max: 50,
                    message: '不得多于50个字符',
                  }],
              })(
                <TextArea className="businessinfoInput" rows={2} disabled={!disabled} style={{ width: '100%' }} />,
              )}
            </FormItem>
            <FormItem
              {...FormItemLayout}
              label="管理员姓名"
              required
            >{getFieldDecorator('superName', {
              initialValue: superName,
              rules: [{
                message: '请输入管理员姓名！',
                required: true,
              }, {
                pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/, message: '请输入2-10位中文或英文字符！',
              }],
            })(
              <Input type="text" className="businessinfoInput" disabled style={{ width: '100%' }} />,
            )}
            </FormItem>
            <FormItem
              {...FormItemLayout}
              label="管理员手机号"
            >
              <span>
                {superMobile}
                {isSuper === '1' && <a href="" style={{ marginLeft: 20, textDecoration: 'none' }} onClick={onReset}>变更管理员</a>}
              </span>
            </FormItem>
            <FormItem
              {...FormItemLayout}
              label="电子邮箱"
            >{getFieldDecorator('tenEmail', {
              initialValue: tenEmail,
              validateTrigger: ['onBlur', 'onSubmit'],
              rules: [{
                message: '请输入电子邮箱！',
                required: true,
              }, {
                pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: '邮箱格式错误',
              }],
            })(
              <Input type="text" className="businessinfoInput" disabled={!disabled} style={{ width: '100%' }} />,
            )}
            </FormItem>
            {isSuper === '1' && businessButton.edit && <FormItem
              {...FormItemLayout1}
            >
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>}
          </Col>
        </Row>
      </Form>
    </div>
  );
};


businessInfo.propTypes = {
  form: PropTypes.object,
  isSuper: PropTypes.string,
  businessButton: PropTypes.object,
  onBeforeUpload: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  tenProvinceName: PropTypes.string,
  tenCityName: PropTypes.string,
  tenDistrictName: PropTypes.string,
  onProvinceChange: PropTypes.func,
  onCityChange: PropTypes.func,
  onDistrictChange: PropTypes.func,
  onSubmit: PropTypes.func,
  tenProvinceList: PropTypes.array,
  tenCityList: PropTypes.array,
  tenDistrictList: PropTypes.array,
  superMobile: PropTypes.string,
  tenName: PropTypes.string,
  superName: PropTypes.string,
  tenEmail: PropTypes.string,
  tenAddress: PropTypes.string,
  braLogo: PropTypes.string,
  fileList: PropTypes.array,
  onPreview: PropTypes.func,
  onCancelPic: PropTypes.func,
  previewVisible: PropTypes.bool,
  previewImgUrl: PropTypes.string,
  onReset: PropTypes.func,
};

export default Form.create()(businessInfo);
