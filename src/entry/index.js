import dva from 'dva';
import createLoading from 'dva-loading';
import './index.less';

// 1. Initialize
const app = dva({
  onError(error) {
    console.error(error);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model

// 公用model
app.model(require('../models/app'));

// 基础系统

app.model(require('../models/system/home'));

app.model(require('../models/system/login'));

app.model(require('../models/system/organization'));
app.model(require('../models/system/password'));
app.model(require('../models/system/baseInfo'));
app.model(require('../models/system/businessInfo'));
app.model(require('../models/system/register'));
app.model(require('../models/system/bindCheck'));
app.model(require('../models/system/bindUser'));
app.model(require('../models/system/registerResult'));
app.model(require('../models/system/forgetPassword'));
app.model(require('../models/system/forgetPasswordResult'));
app.model(require('../models/system/staff'));
app.model(require('../models/system/role'));
app.model(require('../models/system/myBusiness'));


app.model(require('../models/payment/receiptAccount'));
app.model(require('../models/payment/receiptChannel'));
app.model(require('../models/payment/receiptShop'));
app.model(require('../models/payment/bindAccount'));

// 应用系统
app.model(require('../models/appMart/order'));
app.model(require('../models/appMart/market'));
app.model(require('../models/appMart/myApp'));
app.model(require('../models/appMart/orderResult'));
app.model(require('../models/appMart/manage'));
app.model(require('../models/appMart/orderRecord'));

// 应用市场
app.model(require('../models/appPacks/demo'));
app.model(require('../models/appPacks/report'));
app.model(require('../models/appPacks/takeout'));
app.model(require('../models/appPacks/mwCRM'));
app.model(require('../models/appPacks/mwQueue'));

app.model(require('../models/appPacks/mwOrdain'));

// 4. Router
app.router(require('../routes'));

// 5. Start
app.start('#root');
