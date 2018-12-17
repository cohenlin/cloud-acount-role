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
    form: {
        getFieldDecorator,
    },
 }) => {
  const modalOpts = {
    width: 600,
    title,
    visible,
    cancelText: '取消',
    okText: '确定',
    // onOk: handleOk,
    onCancel,
    confirmLoading: loading,
    maskClosable: false,
  };

  const InputProps = {
    style: {
    },
  };

  console.log(`postName: ${postName}`);

  // 下拉框属性
  const SelectProps = {
    dropdownMatchSelectWidth: false,
  };

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

  const treeProps = {
    allowClear: true,
    checkable: true,
  };

  return (
    <Modal {...modalOpts} >
      <Form>
        <Row>
          <Col>
            <FormItem {...formItemLayout} label="角色名称" hasFeedback>
              {
                getFieldDecorator('postName', {
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
              {getFieldDecorator('postCode', {
                initialValue: postCode,
                rules: [
                  {
                    required: true,
                    message: '权重不能为空',
                  },
                ],
              })(<Select placeholder="请选择权重" {...SelectProps} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="权限" hasFeedback>
              {getFieldDecorator('nodeIdList')(
                <Tree {...treeProps}>
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
  roleList: PropTypes.array,
};

export default Form.create()(modal);
