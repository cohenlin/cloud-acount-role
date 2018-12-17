/**
 * Create by liukang on 2018/03/06
 * */
import { parse } from 'qs';

// const Mock = require('mockjs');
const apiPrefix = '/test_api/test_payment';

const channelsListData = [
  {
    id: '1001',
    name: '支付宝',
    defAggregator: 'CHENSEN',
    code: 'alipay',
    state: '1',
    isDiscount: '1',
    discountCode: 'asda',
    defIsv: null,
    startBit: [
      '456',
      '457',
      '458',
    ],
  },
  {
    id: '1002',
    name: '微信',
    defAggregator: 'CHENSEN',
    code: 'WECHAT',
    state: '1',
    isDiscount: '1',
    discountCode: 'qwe',
    defIsv: '20001',
    startBit: [
      '556',
      '557',
      '558',
    ],
  },
  {
    id: '1003',
    name: '云闪付',
    defAggregator: 'CHENSEN',
    code: 'cloud',
    state: '0',
    isDiscount: '0',
    discountCode: null,
    defIsv: null,
  },
];

const database = channelsListData;

const providerListData = [
  {
    code: 'CHENSEN',
    name: '辰森',
  },
  {
    code: 'MEIWEI',
    name: '美味',
  },
  {
    code: 'WEIMEI',
    name: '唯美汇通',
  },
];

const isvListData = [
  {
    id: '20001',
    name: '辰森',
  },
  {
    id: '20002',
    name: '微服务',
  },
];

module.exports = {
  [`GET ${apiPrefix}/channel/setting/page`](req, res) {
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
        pageno: Number.parseInt(current, 10),
        rowcount: Number.parseInt(size, 10),
        orderby: null,
        total: list.length,
      },
    };
    res.json(response);
  },
  [`PUT ${apiPrefix}/channel/setting/enable`](req, res) {
    const { enable, ids } = req.body;
    for (let i = 0; i < database.length; i += 1) {
      ids.forEach((it) => {
        if (database[i].id === it) {
          database[i].state = enable;
        }
      });
    }
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
  [`GET ${apiPrefix}/channel/*/aggregators`](req, res) {
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: providerListData,
    };
    res.json(response);
  },
  [`GET ${apiPrefix}/isv`](req, res) {
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: isvListData,
    };
    res.json(response);
  },
  [`PUT ${apiPrefix}/channel/setting`](req, res) {
    const data = req.body;
    for (let i = 0; i < database.length; i += 1) {
      if (database[i].id === data.id) {
        data.state = database[i].state;
        database[i] = data;
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
