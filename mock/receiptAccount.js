/**
 * Create by liukang on 2018/03/06
 * */
import { parse } from 'qs';
// const Mock = require('mockjs');

const apiPrefix = '/test_api/test_payment';

const listData = [
  {
    id: '1001',
    name: '北区账户',
    state: '1',
    bindNum: '3',
    merchantId: 'b7fe0637-c3c1-4ac6-b77e-665f42b6d7de',
    channels: ['支付宝', '微信', '云闪付'],
  },
  {
    id: '1002',
    name: '忘京托管店',
    state: '0',
    bindNum: '0',
    merchantId: 'b7fe0637-c3c1-4ac6-b77e-665f42b6d7de',
    channels: null,
  },
  {
    id: '1003',
    name: '南区账户',
    state: '1',
    bindNum: '2',
    merchantId: 'b7fe0637-c3c1-4ac6-b77e-665f42b6d7de',
    channels: ['支付宝', '微信'],
  },
];

const database = listData;

module.exports = {
  [`GET ${apiPrefix}/account/page`](req, res) {
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
  [`PUT ${apiPrefix}/account/enable`](req, res) {
    const { enable, ids } = req.body;
    const errmsg = [];
    for (let i = 0; i < database.length; i += 1) {
      ids.forEach((it) => {
        if (database[i].id === it) {
          if (enable === '1') {
            database[i].state = enable;
          } else if (Number.parseInt(database[i].bindNum, 10) > 0) {
            errmsg.push(database[i].name);
          } else {
            database[i].state = enable;
          }
        }
      });
    }
    let response = {};
    if (errmsg.length > 0) {
      response = {
        status: '1',
        msg: `停用失败,以下账号正在使用: ${errmsg.join(',')}`,
        data: null,
      };
    } else {
      response = {
        status: '200',
        msg: 'SUCCESS',
        data: null,
      };
    }
    res.json(response);
  },
  [`PUT ${apiPrefix}/account`](req, res) {
    const data = req.body;
    for (let i = 0; i < database.length; i += 1) {
      if (database[i].id === data.id) {
        database[i].name = data.name;
      }
    }
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
  [`POST ${apiPrefix}/account`](req, res) {
    const data = req.body;
    const id = `${new Date().getTime()}`;
    database.push({
      id,
      name: data.name,
      state: '0',
      bindNum: '0',
      channels: null,
      ...data,
    });
    const response = {
      status: '200',
      msg: 'SUCCESS',
      data: null,
    };
    res.json(response);
  },
  [`DELETE ${apiPrefix}/account`](req, res) {
    const data = req.body;
    const errmsg = [];
    data.ids.forEach((it) => {
      for (let i = 0; i < database.length; i += 1) {
        if (database[i].id === it) {
          if (Number.parseInt(database[i].bindNum, 10) > 0) {
            errmsg.push(database[i].name);
            break;
          } else {
            database.splice(i, 1);
            break;
          }
        }
      }
    });
    let response = {};
    if (errmsg.length > 0) {
      response = {
        status: '1',
        msg: `删除失败,以下账号正在使用: ${errmsg.join(',')}`,
        data: null,
      };
    } else {
      response = {
        status: '200',
        msg: 'SUCCESS',
        data: null,
      };
    }
    res.json(response);
  },
};
