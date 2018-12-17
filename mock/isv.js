/**
 * Create by liukang on 2018/03/06
 * */
import { parse } from 'qs';

// const Mock = require('mockjs');

const apiPrefix = '/test_api/test_payment';

const listData = [
  {
    id: '20001',
    name: '辰森世纪',
    appid: 'QWRR5615641556',
    code: 'ASF564894158796',
    key: 'AS123-K124J-12LK4-124KD',
    uploadfileTime: '2018/03/08',
    certificate: '216541',
  },
  {
    id: '20002',
    name: '雅座',
    appid: 'QWRR5615641557',
    code: 'ASF564894158796',
    key: 'AS123-K124J-12LK4-124KD',
    uploadfileTime: '2018/03/08',
    certificate: '216541',
  },
  {
    id: '20003',
    name: '银盒子',
    appid: 'QWRR5615641558',
    code: 'ASF564894158796',
    key: 'AS123-K124J-12LK4-124KD',
    uploadfileTime: '',
    certificate: '',
  },
];

const database = listData;

module.exports = {
  [`GET ${apiPrefix}/isv/page`](req, res) {
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
  [`PUT ${apiPrefix}/isv`](req, res) {
    const data = req.body;
    for (let i = 0; i < database.length; i += 1) {
      if (database[i].id === data.id) {
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
  [`POST ${apiPrefix}/isv`](req, res) {
    const data = req.body;
    data.id = new Date().getTime();
    database.push(data);
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: {
        id: data.id,
      },
    };
    res.json(response);
  },
  [`DELETE ${apiPrefix}/isv`](req, res) {
    const data = req.body;
    data.ids.forEach((it) => {
      for (let i = 0; i < database.length; i += 1) {
        if (database[i].id === it) {
          database.splice(i, 1);
          break;
        }
      }
    });
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
};
