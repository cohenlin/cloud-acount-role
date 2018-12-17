import lodash from 'lodash';
import classnames from 'classnames';
import config from './config';
import request from './request';
import { color } from './theme';

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;
const document = window.document;

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 对象转数组，并于map结构
 * @param   {Object} data
 * @return  {Array}
 */
const objToArray = (data) => {
  const toArray = [];
  Object.entities(data).map((item) => {
    if (item[0]) {
      const arr = {
        code: item[0],
        name: item[1],
      };
      toArray.push(arr);
    }
    return null;
  });
  return toArray;
};

/**
 * 提取目标json数组里每项的某个字段为字符串
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {String} 返回的是由该json数组里每个项里某个字段组成的以‘，’分割的字符串
 */
const codeToString = (dataArray, field) => {
  const codeArray = [];
  dataArray.map((item) => {
    if (item) {
      codeArray.push(item[field]);
    }
    return null;
  });
  return codeArray.join(',');
};

/**
 * 提取目标json数组里每项的某个字段为一个String数组
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {Array} 返回的是由该json数组里每个项里某个字段组成String数组
 */
const codeToArray = (dataArray, field) => {
  const codeArray = [];
  dataArray.map((item) => {
    if (item) {
      codeArray.push(item[field]);
    }
    return null;
  });
  return codeArray;
};

/**
 * 传入codes字符串，删除目标json数组里的某个字段包含在该字符串中的项，返回新json数组
 * @param   {Array} codeArray
 * @param   {String} codes 字符串，传入要删除字符项字符串
 * @return  {Array} 返回删除codes字符串项后返回新数组
 */
const deleteCodes = (codeArray, codes) => {
  const dataArray = []; // 用于存放最终json数组对象
  codeArray.map((item) => {
    if (codes.split(',').indexOf(item) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

/**
 * 传入codes字符串，删除目标json数组里的某个字段包含在该字符串中的项，返回新json数组
 * @param   {Array} arrayData
 * @param   {String} codes
 * @param   {String} field json数组里的某个比较字段
 * @return  {Array}
 */
const deleteArray = (arrayData, codes, field) => {
  const dataArray = []; // 用于存放最终json数组对象
  arrayData.map((item) => {
    if (codes.split(',').indexOf(item[field]) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

/**
 * 传入json数组，提取某个字段为数组
 * @param   {Array} objectArray
 * @param   {String} field
 * @return  {Array}
 */
const filterArray = (objectArray, field) => {
  const dataArray = []; // 用于存放最终json数组对象
  objectArray.map((item) => {
    dataArray.push(item[field]);
    return null;
  });
  return dataArray;
};

// 去除每个子项的前后空格
const trimParam = data => data.toString().replace(/(^\s*)|(\s*$)/g, '');

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      if (!hashVP[children]) {
        hashVP[children] = [];
      }
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

// 获取浏览器可视高度
const getScreenHeight = () => window.innerHeight || window.document.documentElement.height;

const clearLocalStorage = () => {
  window.localStorage.removeItem('userInfo');
};
const toJson = str => JSON.parse(str);
const toStr = json => JSON.stringify(json);

const getLocal = name => localStorage.getItem(name);
const saveLocal = (name, data) => {
  localStorage.setItem(name, data);
};
const delLocal = (name) => {
  localStorage.removeItem(name);
};

const getSession = name => sessionStorage.getItem(name);
const saveSession = (name, data) => {
  sessionStorage.setItem(name, data);
};
const delSession = (name) => {
  sessionStorage.removeItem(name);
};

// 设置cookie
const setCookie = (name, value, seconds) => {
  const secondsParam = seconds || 0; // seconds有值就直接赋值，没有为0，这个根php不一样。
  let expires = '';
  if (secondsParam !== 0) { // 设置cookie生存时间
    const date = new Date();
    date.setTime(date.getTime() + (secondsParam * 1000));
    expires = `; expires=${date.toGMTString()}`;
  }
  document.cookie = `${name}=${escape(value)}${expires}; path=/`; // 转码并赋值
};

// 取得cookie
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';'); // 把cookie分割成组
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]; // 取得字符串
    while (c.charAt(0) === ' ') { // 判断一下字符串有没有前导空格
      c = c.substring(1, c.length); // 有的话，从第二位开始取
    }
    if (c.indexOf(nameEQ) === 0) { // 如果含有我们要的name
      return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
    }
  }
  return false;
};

// 清除cookie
const clearCookie = (name) => {
  setCookie(name, '', -1);
};


const getFormData = (params) => {
  const formData = new window.FormData();
  Object.entries(params).map((item) => {
    if (item[1]) {
      formData.append(item[0], (typeof item[1] === 'object') ? JSON.stringify(item[1]) : item[1]);
    }
    return false;
  });
  return formData;
};
/**
 * 提取Array里每项的某个字段为一个String数组
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {Array} 返回的是由该json数组里每个项里某个字段组成String数组
 */

const treeToArray = (dataArray, field, newArr = []) => {
  dataArray.map((item) => {
    if (item.children.length > 0) {
      treeToArray(item.children, field, newArr);
    }
    if (item[field] !== null && item.preAppsName.length === 0) {
      newArr.push(item[field]);
    }
    return newArr;
  });
  return newArr;
};
module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  trimParam,
  queryArray,
  filterArray,
  arrayToTree,
  objToArray,
  codeToString,
  codeToArray,
  deleteArray,
  deleteCodes,
  clearLocalStorage,
  toJson,
  toStr,
  saveLocal,
  getLocal,
  delLocal,
  saveSession,
  getSession,
  delSession,
  getFormData,
  setCookie,
  getCookie,
  clearCookie,
  getScreenHeight,
  treeToArray,
};
