import React, { PropTypes } from 'react';
import { Form, Input, Button, TreeSelect, Row, Col, Radio, Modal, Tree } from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

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
const formItemLayout1 = {
  wrapperCol: {
    span: 18,
    offset: 6,
  },
};

const feature = ({
     loading,
     staffButton,
     searchInfo,    // 搜索信息
     onAdd,      // 新增员工
     status,
     deleteBtnStatus, // 删除按钮禁用状态
     startBtnStatus,  // 启用按钮禁用状态
     blockBtnStatus,  // 停用按钮禁用状态
     onChangeStatus,  //
     onBlock,       // 停用
     onStart,       // 启用
     onDelete,      // 删除
     checkedStaffStartId, // 选中可停用员工id
     checkedStaffBlockId, // 选中可启用员工id
     onSearchItem,    // 搜索输入
     // onClearSearch,
     onSearch,      // 搜索按钮
     checkedStaff,  // 选中员工
     onSubsidiaryTreeChange,
     authorityTreeData,
      form: {
        getFieldDecorator,
      },
    }) => {
  let authRef;
  const authorityProps = {
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
    onChange: onSubsidiaryTreeChange,
    getPopupContainer: () => window.document.getElementById('authority'),
    dropdownStyle: {
      maxHeight: 260,
      overflow: 'auto',
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
  const showConfirm = (e) => {
    const info = e.target.value;
    let staffNumber = 0;
    let content = '';
    const CheckedStaffNumber = checkedStaff.length;
    switch (info) {
      case '删除':
        staffNumber = checkedStaff.length;
        content = `删除选中的${staffNumber}个员工！`;
        break;
      case '启用':
        staffNumber = checkedStaffBlockId.length;
        content = `当前选中${CheckedStaffNumber}个员工，可启用${staffNumber}个员工！`;
        break;
      case '停用':
        staffNumber = checkedStaffStartId.length;
        content = `当前选中${CheckedStaffNumber}个员工，可停用${staffNumber}个员工！`;
        break;
      default:
        break;
    }
    confirm({
      title: `确定${e.target.value}吗？`,
      content,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        switch (info) {
          case '删除':
            onDelete();
            break;
          case '启用':
            onStart();
            break;
          case '停用':
            onBlock();
            break;
          default:
            break;
        }
      },
      onCancel() {},
    });
  };
  return (<div className="components-search search">
    <Form>
      <Row>
        <Col span={8} xl={8} xxl={6} id="authority" >
          <FormItem
            {...formItemLayout}
            label="权限机构"
          >
            <TreeSelect placeholder="请选择机构" {...authorityProps}>
              {loopTree(authorityTreeData)}
            </TreeSelect>
          </FormItem>
        </Col>
        <Col span={8} xl={8} xxl={6} >
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            {getFieldDecorator('status',
              {
                initialValue: status,
              })(<Radio.Group onChange={onChangeStatus} style={{ width: '100%' }}>
                <Radio.Button value="1" loading={loading}>正常</Radio.Button>
                <Radio.Button value="0" loading={loading}>停用</Radio.Button>
                <Radio.Button value="" loading={loading}>全部</Radio.Button>
              </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8} xl={8} xxl={6}>
          <FormItem
            className="search-input"
            {...formItemLayout1}
          >
            <Search enterButton="搜索" style={{ width: '100%' }} value={searchInfo} onChange={onSearchItem} onSearch={onSearch} onPressEnter={onSearch} placeholder="输入员工姓名或手机号" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div className="action-box">
      <Row >
        <Col span={16}>
          {staffButton && staffButton.add && <Button type="primary" onClick={onAdd}>+ 新增员工</Button>}
          {staffButton && staffButton.off && <Button onClick={showConfirm} value="停用" disabled={blockBtnStatus} loading={loading}>停用</Button>}
          {staffButton && staffButton.on && <Button onClick={showConfirm} value="启用" disabled={startBtnStatus} loading={loading}>启用</Button>}
          {staffButton && staffButton.delete && <Button onClick={showConfirm} value="删除" disabled={deleteBtnStatus} loading={loading}>删除</Button>}
        </Col>
      </Row>
    </div>
  </div>);
};
feature.propTypes = {
  form: PropTypes.object,
  checkedStaff: PropTypes.array,
  staffButton: PropTypes.object,
  authorityTreeData: PropTypes.array,
  searchInfo: PropTypes.string,
  status: PropTypes.string,
  deleteBtnStatus: PropTypes.bool,
  startBtnStatus: PropTypes.bool,
  blockBtnStatus: PropTypes.bool,
  onChangeStatus: PropTypes.func,
  onAdd: PropTypes.func,
  onBlock: PropTypes.func,
  onStart: PropTypes.func,
  onDelete: PropTypes.func,
  onSearchItem: PropTypes.func,
  onSearch: PropTypes.func,
  onSubsidiaryTreeChange: PropTypes.func,
  checkedStaffStartId: PropTypes.array, // 选中可停用员工id
  checkedStaffBlockId: PropTypes.array, // 选中可启用员工id
  loading: PropTypes.bool,
  // onClearSearch: PropTypes.func,
};

export default Form.create()(feature);
