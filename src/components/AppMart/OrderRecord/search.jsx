/**
 * Created by Wangtaidong on 2018/2/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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

const Search = ({
  apps,
  onSelectApp,
  onSelectStatus,
}) => {
  const appOptions = apps.map((item) => {
    let node;
    if (item) {
      node = (<Option
        key={item.id}
        value={item.id}
      >
        {item.applicationName}
      </Option>);
    }
    return node;
  });
  const selectProps = {
    style: { width: '100%' },
    defaultValue: '所有服务',
    onSelect: onSelectApp,
    getPopupContainer: () => window.document.getElementById('selectId'),
  };
  return (
    <div className="search">
      <Form>
        <Row>
          <Col span={8} xl={8} xxl={6} id="selectId">
            <FormItem
              {...formItemLayout}
              label="服务"
            >
              <Select {...selectProps} >
                <Option value="">所有服务</Option>
                {appOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={8} xl={8} xxl={6} id="selectId1">
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              <Select
                style={{ width: '100%' }}
                defaultValue="所有状态"
                onSelect={onSelectStatus}
                getPopupContainer={() => window.document.getElementById('selectId1')}
              >
                <Option value="">所有状态</Option>
                <Option value="0">待处理</Option>
                <Option value="1">已生效</Option>
                <Option value="2">已取消</Option>
                <Option value="3">未通过</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

Search.propTypes = {
  apps: PropTypes.array,
  onSelectApp: PropTypes.func,
  onSelectStatus: PropTypes.func,
};

export default Form.create()(Search);
