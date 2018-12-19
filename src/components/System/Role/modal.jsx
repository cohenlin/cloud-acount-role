import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select, Row, Col, Tree, Radio, message, TreeSelect } from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

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
    title,
    visible,
    loading,
    postName,
    postCode,
    roleList,
    onCancel,
    onSubmit,
    onCheck,
    checkedRoleKeys, // 新增界面选中权限树节点集合
    form: {
      validateFields,
      getFieldDecorator,
    },
 }) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onSubmit(values);
      }
    });
  };

  const modalOpts = {
    width: 600,
    title,
    visible,
    cancelText: '取消',
    okText: '确定',
    onOk: handleOk,
    onCancel,
    confirmLoading: loading,
    maskClosable: false,
  };

  const InputProps = {
    style: {
    },
  };
  // 下拉框属性
  const SelectProps = {
    dropdownMatchSelectWidth: false,
  };

  // 递归构建权限树
  const loopTree = data => data.map((item) => {
    if (item.children && item.children.length) {
      return (
        <TreeNode title={item.menugroupsName} key={item.id} value={item.id} dataRef={item}>
          {loopTree(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.menugroupsName} key={item.id} value={item.id} dataRef={item} />;
  });

  // 权重下拉框的选项
  const opsList = [{ id: '9', postName: '总部管理员' }, { id: '2', postName: '门店管理员' }, { id: '3', postName: '门店员工' }];
  const postOption = opsList.map(item =>
    <Select.Option value={item.id} key={item.id}>{item.postName}</Select.Option>);

  return (
    <Modal {...modalOpts} >
      <Form>
        <Row>
          <Col>
            <FormItem {...formItemLayout} label="角色名称" hasFeedback>
              {
                getFieldDecorator('post_name', {
                  initialValue: postName,
                  rules: [{
                    required: true,
                    message: '请输入角色名称！',
                  }, {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  }],
                })(
                  <Input
                    type="text"
                    placeholder="2到10位的中文或英文字符"
                    {...InputProps}
                  />)
            }
            </FormItem>

            <FormItem {...formItemLayout} label="权重" hasFeedback>
              {getFieldDecorator('post_code', {
                initialValue: postCode,
                rules: [
                  {
                    required: true,
                    message: '权重不能为空',
                  },
                ],
              })(<Select placeholder="请选择权重" {...SelectProps}>
                { postOption }
              </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label="权限" hasFeedback>
              {getFieldDecorator('node_id_list')(
                <Tree
                  allowClear
                  checkable
                  checkedKeys={checkedRoleKeys}
                  onCheck={onCheck}
                >
                  {loopTree(roleList || [])}
                </Tree>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  postName: PropTypes.string,
  postCode: PropTypes.number,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  roleList: PropTypes.array,
  checkedRoleKeys: PropTypes.array,
  onCheck: PropTypes.func,
};

export default Form.create()(modal);
