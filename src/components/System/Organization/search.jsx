import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Tree, TreeSelect, Button } from 'antd';
// import { filterArray } from '../../../utils/index';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const search = ({
                  treeDate,
                  searchName,
                  onSubmit,
                  onChangeId,
                  onChangeName,
                }) => {
  const loopTree = data => data.map((item) => {
    if (item.children && item.children.length) {
      return (
        <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} >
          {loopTree(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} />;
  });
  let authRef;
  const treeProps = {
    allowClear: true,
    searchPlaceholder: '请选择机构',
    multiple: true,
    treeDefaultExpandedKeys: ['000'],
    treeCheckable: true,
    ref: (e) => {
      authRef = e;
      if (e && authRef.rcTreeSelect.inputInstance) {
        authRef.rcTreeSelect.inputInstance.disabled = true; // 定位光标
      }
    },
    style: {
      width: '100%',
    },
    onChange: onChangeId,
    getPopupContainer: () => window.document.getElementById('formId'),
    dropdownStyle: {
      maxHeight: 260,
      overflow: 'auto',
    },
  };
  const formItemLayout = {
    labelCol: {
      span: 10,
      md: 10,
      lg: 10,
      xl: 10,
      xxl: 10,
    },
    wrapperCol: {
      span: 14,
      md: 14,
      lg: 14,
      xl: 14,
      xxl: 14,
    },
  };
  return (<div className="components-search search">
    <Form>
      <Row>
        <Col span={8} xl={8} xxl={6} id="formId" >
          <FormItem
            {...formItemLayout}
            label="组织机构"
          >
            <TreeSelect
              {...treeProps}
            >
              {loopTree(treeDate)}
            </TreeSelect>
          </FormItem>
        </Col>
        <Col span={8} xl={8} xxl={6} >
          <FormItem
            {...formItemLayout}
            label="门店"
          >
            <Input
              value={searchName}
              type="text"
              placeholder="输入门店名称"
              onChange={e => onChangeName(e)}
              onPressEnter={onSubmit}
              style={{ width: '100%' }}
            />
          </FormItem>
        </Col>
        <Col span={8} xl={8} xxl={12} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={onSubmit}>搜索</Button>
        </Col>
      </Row>
    </Form>
  </div>
  );
};

search.propTypes = {
  treeDate: PropTypes.array,
  searchName: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeId: PropTypes.func,
  onChangeName: PropTypes.func,
};

export default Form.create()(search);
