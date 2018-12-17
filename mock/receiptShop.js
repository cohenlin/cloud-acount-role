/**
 * Create by liukang on 2018/03/06
 * */
import { parse } from 'qs';
import storesJSON from '../mock-data/stores.json';
// const Mock = require('mockjs');

const apiPrefix = '/test_api/test_payment';

const listData = [
  {
    id: '1001',
    name: '泉城路店',
    state: '1',
    bindNum: '3',
    merchantId: '1111',
    channels: ['支付宝', '微信', '云闪付'],
  },
  {
    id: '1002',
    name: '解放桥店',
    state: '0',
    bindNum: '0',
    merchantId: '1112',
    channels: null,
  },
  {
    id: '1003',
    name: '大明湖店',
    state: '1',
    bindNum: '2',
    merchantId: '1113',
    channels: ['支付宝', '微信'],
  },
];

const database = listData;
module.exports = {
  [`GET ${apiPrefix}/account/*/stores`](req, res) {
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
  [`GET ${apiPrefix}/merchant/*/stores`](req, res) {
    res.json(storesJSON);
  },
};
