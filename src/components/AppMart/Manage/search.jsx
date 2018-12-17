/**
 * Created by xiaochenghua on 2018/02/06.
 */
import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Input, Select, Modal } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const confirm = Modal.confirm;

const search = ({
   onSearch,
   onSearchItem,
   onSelectState,
   onStop,
   onStart,
   startFlag,
   stopFlag,
   selectedStop,
   selectedStart,
   selectedItem,
   selectStatus,
   name,
  }) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    let shopNumber = 0;
    let content = '';
    const selectedItemNumber = selectedItem.length;
    switch (info) {
      case '上架':
        shopNumber = selectedStart.length;
        content = `当前选中${selectedItemNumber}个门店，可上架${shopNumber}个门店！`;
        break;
      case '下架':
        shopNumber = selectedStop.length;
        content = `当前选中${selectedItemNumber}个门店，可下架${shopNumber}个门店！`;
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
          case '上架':
            onStart();
            break;
          case '下架':
            onStop();
            break;
          default:
            break;
        }
      },
      onCancel() {
      },
    });
  };
  const selectProps = {
    value: selectStatus,
    onChange: val => onSelectState(val),
    style: { width: 120, marginLeft: 16 },
    getPopupContainer: () => window.document.getElementById('selectId'),
  };
  return (
    <Form layout="inline">
      <FormItem>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={16} className="search-input">
                <Search
                  value={name}
                  placeholder="搜索门店"
                  onSearch={onSearch}
                  onChange={val => onSearchItem(val)}
                  enterButton
                />
              </Col>
              <Col span={8} id="selectId">
                <Select {...selectProps} >
                  <Option value=" ">全部状态</Option>
                  <Option value="2">已过期</Option>
                  <Option value="1">正常</Option>
                  <Option value="0">未上架</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button onClick={showConfirm} style={{ width: 80 }} disabled={startFlag} value="上架">上架</Button>
            <Button onClick={showConfirm} style={{ width: 80, marginLeft: 16 }} disabled={stopFlag} value="下架">
              下架
            </Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  );
};

search.propTypes = {
  onSearch: PropTypes.func,
  onSelectState: PropTypes.func,
  onSearchItem: PropTypes.func,
  startFlag: PropTypes.bool,
  selectedStop: PropTypes.array,
  selectedStart: PropTypes.array,
  selectedItem: PropTypes.array,
  stopFlag: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  selectStatus: PropTypes.string,
  name: PropTypes.string,
};

export default Form.create()(search);
