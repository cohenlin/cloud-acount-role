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
    id: '1001',
    channelName: '支付宝',
    state: '1',
    channelCode: 'alipay',
  },
  {
    id: '1002',
    channelName: '微信',
    state: '0',
    channelCode: 'WECHAT',
  },
  {
    id: '1003',
    channelName: '云闪付',
    state: '1',
    channelCode: 'cloud',
  },
];

const items = {
  1001: {
    id: '1001',
    name: '支付宝',
    state: '1',
    channelCode: 'alipay',
    type: 'AGGREGATOR',
    aggCode: 'CHENSEN',
    isvId: '20001',
    setting: '{"appid":"123456","marchId":"54654654"}',
    uploadfileTime: '2018-03-08',
  },
  1002: {
    id: '1002',
    name: '微信',
    state: '1',
    channelCode: 'WECHAT',
    type: 'AGGREGATOR',
    aggCode: 'CHENSEN',
    isvId: '20001',
    setting: '{"appId":"123456","mchId":"54654654","mchKey":"4165465165"}',
    uploadfileTime: '',
  },
};

let database = listData;

module.exports = {
  [`GET ${apiPrefix}/account/*/channels`](req, res) {
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: database,
    };
    res.json(response);
  },
  [`POST ${apiPrefix}/account/*/channels`](req, res) {
    const ids = req.body;
    const newDatabase = [];
    let ii = 0;
    ids.forEach((it) => {
      let channel;
      for (let i = 0; i < channels.length; i += 1) {
        if (channels[i].code === it) {
          channel = channels[i];
          break;
        }
      }
      ii += 1;
      const id = `${new Date().getTime() + ii}`;
      newDatabase.push({
        id,
        channelName: channel.name,
        state: Number.parseInt(id, 10) % 2 === 0 ? '0' : '1',
        channelCode: channel.code,
      });
      items[id] = {
        id,
        name: channel.name,
        state: Number.parseInt(id, 10) % 2 === 0 ? '0' : '1',
        channelCode: channel.code,
        type: 'AGGREGATOR',
        aggCode: 'CHENSEN',
        isvId: '20001',
        setting: '{"appId":"123456","mchId":"54654654","mchKey":"4165465165"}',
        uploadFileTime: '2018-03-08',
      };
    });
    database = newDatabase;
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
  [`GET ${apiPrefix}/channel/*`](req, res) {
    const { id } = parse(req.url.split('?')[1]);
    const data = items[id] || {};
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data,
    };
    res.json(response);
  },
};
