import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select, Row, Col, Tree, Radio, message, TreeSelect } from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const { TextArea } = Input;

message.config({
  top: 300,
  duration: 2,
});

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const modal = ({
   loading,
   title,
   visible,
   onSubmit,
   onCancel,
   onChange,
   realname,
   gender,
   mobile,
   post,
   provinceName,
   cityName,
   districtName,
   address,
   editStoreId,
   authStores,
   authorityTreeData,
   idCard,
   postList,
   provinceList,
   cityList,
   districtList,
   onProvinceChange,
   onCityChange,
   onDistrictChange,
   form: {
     validateFields,
     getFieldDecorator,
   },
 }) => {
  let subRef;
  let authRef;
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onSubmit(values);
      }
    });
  };
  const modalOpts = {
    width: 915,
    title,
    visible,
    cancelText: '取消',
    okText: '确定',
    onOk: handleOk,
    onCancel,
    confirmLoading: loading,
    maskClosable: false,
  };
  const postOption = postList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.postName}</Select.Option>);
  const provinceOption = provinceList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);
  const cityOption = cityList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);
  const districtOption = districtList.map(store =>
    <Select.Option value={store.id} key={store.id}>{store.areaName}</Select.Option>);
  const SelectProps = {
    dropdownMatchSelectWidth: false,
    style: {
      width: '32%',
      marginRight: '1%',
    },
  };
  const provinceSelectProps = provinceName && {
    value: provinceName,
  };
  const citySelectProps = cityName && {
    value: cityName,
  };
  const districtSelectProps = districtName && {
    value: districtName,
  };
  const subsidiaryProps = {
    allowClear: true,
    treeDefaultExpandedKeys: ['004'],
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: '请选择隶属机构',
    ref: (e) => {
      subRef = e;
      if (e && subRef.rcTreeSelect.inputInstance) {
        subRef.rcTreeSelect.inputInstance.disabled = true; // 定位光标
      }
    },
  };
  const authorityProps = {
    allowClear: true,
    treeDefaultExpandedKeys: ['000'],
    treeCheckable: true,
    searchPlaceholder: '请选择权限机构',
    onChange: e => onChange(e),
    ref: (e) => {
      authRef = e;
      if (e && authRef.rcTreeSelect.inputInstance) {
        authRef.rcTreeSelect.inputInstance.disabled = true; // 定位光标
      }
    },
    style: {
      width: '100%',
      maxHeight: 70,
      overflow: 'auto',
      marginBottom: 5,
    },
  };
  const loopTree = data => data.map((item) => {
    if (item.children && item.children.length) {
      return (
        <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item}>
          {loopTree(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} />;
  });
  const subsidiaryTreeData = authorityTreeData &&
  authorityTreeData[0] ? authorityTreeData[0].children : [];
  return (
    <Modal {...modalOpts} >
      <Form >
        <Row>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="姓名"
              hasFeedback
            >
              {getFieldDecorator('realname', {
                initialValue: realname,
                rules: [{
                  required: true,
                  message: '请输入姓名！',
                }, {
                  pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                  message: '请输入2到10位的中文或英文字符！',
                }],
              })(
                <Input
                  type="text"
                  placeholder="2到10位的中文或英文字符"
                />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('mobile', {
                initialValue: mobile,
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                    message: '手机号格式错误！',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入11位手机号"
                />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('gender', {
                initialValue: gender,
                rules: [
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ],
              })(
                <RadioGroup name="gender">
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="地址"
            >
              <div>
                <Select placeholder="请选择" {...provinceSelectProps} {...SelectProps} onSelect={onProvinceChange}>
                  { provinceOption }
                </Select>
                <Select placeholder="请选择" {...citySelectProps} {...SelectProps} onSelect={onCityChange}>
                  { cityOption }
                </Select>
                <Select placeholder="请选择" {...districtSelectProps} {...SelectProps} onSelect={onDistrictChange}>
                  { districtOption }
                </Select>
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('address', {
                initialValue: address,
                rules: [{
                  max: 50,
                  message: '请输入少于50个字符',
                }],
              })(
                <TextArea
                  type="text"
                  placeholder="请输入详细地址"
                />)}
            </FormItem>
          </Col>
          <Col span={11} offset={2}>
            <FormItem
              {...formItemLayout}
              label="角色"
            >
              {getFieldDecorator('post_id', {
                initialValue: post,
                rules: [
                  { required: true,
                    message: '请选择角色',
                  },
                ],
              })(<Select placeholder="请选择角色" >
                { postOption }
              </Select>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="隶属机构"
            >
              {getFieldDecorator('editStoreId', {
                initialValue: editStoreId || [],
                rules: [
                  {
                    required: true,
                    message: '请选择隶属机构',
                  },
                ],
              })(<TreeSelect placeholder="请选择隶属机构" {...subsidiaryProps}>
                {loopTree(subsidiaryTreeData)}
              </TreeSelect>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="权限机构"
            >
              {getFieldDecorator('stores', {
                initialValue: authStores,
                rules: [
                  {
                    required: true,
                    message: '请选择权限机构',
                  },
                ],
              })(<TreeSelect placeholder="请选择权限机构" {...authorityProps}>
                {loopTree(authorityTreeData)}
              </TreeSelect>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证号"
              hasFeedback
            >
              {getFieldDecorator('id_card', {
                initialValue: idCard,
                rules: [{
                  pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '身份证号格式不正确！',
                }],
              })(
                <Input
                  type="text"
                  placeholder="请输入身份证号"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

  );
};

modal.propTypes = {
  form: PropTypes.object,
  gender: PropTypes.number,
  post: PropTypes.string,
  authStores: PropTypes.array,
  provinceList: PropTypes.array,
  authorityTreeData: PropTypes.array,
  postList: PropTypes.array,
  cityList: PropTypes.array,
  districtList: PropTypes.array,
  title: PropTypes.string,
  realname: PropTypes.string,
  mobile: PropTypes.string,
  provinceName: PropTypes.string,
  cityName: PropTypes.string,
  districtName: PropTypes.string,
  address: PropTypes.string,
  editStoreId: PropTypes.string,
  idCard: PropTypes.string,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  onProvinceChange: PropTypes.func,
  onCityChange: PropTypes.func,
  onDistrictChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default Form.create()(modal);
