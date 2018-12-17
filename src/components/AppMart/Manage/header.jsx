/**
 * Created by xiaochenghua on 2018/02/06.
 */
import React, { PropTypes } from 'react';
import { List, Divider } from 'antd';

const header = ({
   data,
  }) => (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.applicationIcon} role="presentation" style={{ width: 80 }} />}
              title={<b style={{ fontSize: 16 }}>{item.applicationName}</b>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <Divider />
    </div>
  );

header.propTypes = {
  data: PropTypes.array,
};

export default header;
