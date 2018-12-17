/**
 * Create by liukang on 2018/3/7
 * */
const getKey = id => `${id || ''}_${new Date().getTime()}`;
export default getKey;
