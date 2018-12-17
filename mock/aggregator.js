/**
 * Create by liukang on 2018/03/06
 * */
import { parse } from 'qs';

// const Mock = require('mockjs');

const apiPrefix = '/test_api/test_payment';

const channels = [
  {
    code: 'alipay',
    name: '支付宝',
  },
  {
    code: 'WECHAT',
    name: '微信',
  },
  {
    code: 'cloud',
    name: '云闪付',
  },
  {
    code: 'CMB',
    name: '招行',
  },
  {
    code: 'CCB',
    name: '建行',
  },
];

const listData = [
  {
    id: '10001',
    code: 'CHENSEN',
    name: '辰森',
    channels: [
      {
        code: 'alipay',
        name: '支付宝',
      },
      {
        code: 'cloud',
        name: '云闪付',
      },
    ],
  },
  {
    id: '10002',
    code: 'WEIMEIHUITON',
    name: '唯美汇通',
    channels: [
      {
        code: 'cloud',
        name: '云闪付',
      },
    ],
  },
];

const database = listData;

module.exports = {
  [`GET ${apiPrefix}/aggregator/list`](req, res) {
    const { current, size, keyword } = parse(req.url.split('?')[1]);
    let list = database;
    if (keyword) {
      list = list.filter(item => item.name.indexOf(keyword) >= 0);
    }
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: list,
      page: {
        pageno: current,
        rowcount: size,
        orderby: null,
        total: list.length,
      },
    };
    res.json(response);
  },
  [`GET ${apiPrefix}/channel/setting`](req, res) {
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: channels,
    };
    res.json(response);
  },
  [`PUT ${apiPrefix}/aggregator/openup`](req, res) {
    const data = req.body;
    if (data.channels) {
      for (let i = 0; i < data.channels.length; i += 1) {
        channels.forEach((it) => {
          if (data.channels[i] === it.code) {
            data.channels[i] = it;
          }
        });
      }
    }
    for (let i = 0; i < database.length; i += 1) {
      if (database[i].id === data.id) {
        database[i].channels = data.channels;
      }
    }
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
};
