import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Modal from '../../components/System/BusinessInfo/modal';
import Item from '../../components/System/BusinessInfo/item';

const BusinessInfo = ({ cloudState, dispatch }) => {
  const {
    tenProvinceList,
    tenCityList,
    tenDistrictList,
    tenProvinceName,
    tenCityName,
    tenDistrictName,
    status,
    braLogo,
    tenName,
    superName,
    superMobile,
    tenAddress,
    tenEmail,
    tenProvince,
    tenCity,
    tenDistrict,
    fileList,
    previewVisible,
    previewImgUrl,
    count,
    verificationCode,
    getsuperMobile,
    // modal中用到的属性
    loading,
    modalVisible,
    phoneNumber,
    isSuper,
    newSuper, // 新管理员名称
  } = cloudState.businessInfo;
  // 取得business页面的button权限
  const businessButton = cloudState.account.buttonPermissions.system.set.businessInfo;
  const itemProps = {
    tenProvinceList,
    tenCityList,
    tenDistrictList,
    tenProvinceName,
    tenCityName,
    tenDistrictName,
    braLogo,
    tenName,
    superName,
    superMobile,
    tenAddress,
    tenEmail,
    tenCity,
    tenDistrict,
    tenProvince,
    fileList,
    previewVisible,
    previewImgUrl,
    count,
    getsuperMobile,
    businessButton,
    verificationCode, // 验证码
    isSuper,
    onSubmit(values) {
      // 验证省市区不能为空
      if (tenProvinceName === '请选择') {
        message.warning('省份、城市和区县不能为空');
        return;
      } else if (tenCityName === '请选择') {
        message.warning('城市和区县不能为空');
        return;
      } else if (tenDistrictName === '请选择') {
        message.warning('区县不能为空');
        return;
      }
      dispatch({
        type: 'businessInfo/editBusiness',
        payload: {
          braLogo,
          status,
          superMobile,
          superName,
          tenAddress,
          tenCity,
          tenDistrict,
          tenEmail,
          tenName,
          tenProvince,
          tenProvinceName,
          tenCityName,
          tenDistrictName,
          verificationCode,
          ...values,
        },
      });
      dispatch({
        type: 'businessInfo/getProvinceList',
        payload: {},
      });
    },
    onProvinceChange(selectedKeys, info) {
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          tenProvince: selectedKeys,
          tenProvinceName: info.props.children,
          tenCity: '',
          tenDistrict: '',
          tenCityName: '请选择',
          tenDistrictName: '请选择',
        },
      });
      dispatch({
        type: 'businessInfo/queryAreaListByParentId',
        payload: {
          parentId: selectedKeys,
          flag: 'provinceClick',
        },
      });
    },
    onCityChange(selectedKeys, info) {
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          tenCity: selectedKeys,
          tenCityName: info.props.children,
          tenDistrictName: '请选择',
        },
      });
      dispatch({
        type: 'businessInfo/queryAreaListByParentId',
        payload: {
          parentId: selectedKeys,
          flag: 'cityClick',
        },
      });
    },
    onDistrictChange(selectedKeys, info) {
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          tenDistrict: selectedKeys,
          tenDistrictName: info.props.children,
        },
      });
    },
    onBeforeUpload(file) {
      const isTooLarge = file.size > 2 * 1024 * 1024;
      const arr = ['image/jpeg', 'image/bmp', 'image/png', 'image/gif'];
      const isImg = arr.indexOf(file.type) !== -1;
      if (isTooLarge) {
        message.error('图片不能超过2M，请重新上传！');
      }
      if (!isImg) {
        message.error('请上传 bmp, png, jpg, gif 格式的文件');
      }
      return !isTooLarge && isImg;
    },

    onUpload(info) {
      /**
       * Created by Wangtaidong on 2018/1/30.
       */
      const list = info.fileList.slice(-1);
      // 获取图片宽高
      const realImg = window.document.createElement('img');
      if (info.file.thumbUrl !== '') {
        realImg.src = info.file.thumbUrl;
      }
      const isTooLarge = info.file.size > 2 * 1024 * 1024;
      const arr = ['image/jpeg', 'image/bmp', 'image/png', 'image/gif'];
      const isImg = arr.indexOf(info.file.type) !== -1;
      let fileId = '';
      if (list && list.length) {
        const { response } = list[0];
        if (response && response.code === '200') {
          fileId = response.data;
          list[0].url = response.data;
        }
      }
      if (realImg.width > 200 || realImg.height > 200) {
        message.error('图片大小不能超过200px*200px，请重新上传！');
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            fileList: [],
          },
        });
        return false;
      } else if (isTooLarge || !isImg) {
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            fileList: [],
          },
        });
      } else {
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            fileList: list,
          },
        });
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            braLogo: fileId,
          },
        });
      }
      return true;
    },
    onChangeUserAccount(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          superMobile: newValue,
        },
      });
    },

    onChangeVerificationCode(event) {
      const newValue = event.target.value;
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          verificationCode: newValue,
        },
      });
    },
    onPreview(file) {
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          previewVisible: true,
          previewImgUrl: file.url,
        },
      });
    },

    onCancelPic() {
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          previewVisible: false,
        },
      });
    },
    // 验证码倒计时
    onGetCaptcha() {
      let countCache = 59;
      dispatch({
        type: 'businessInfo/sendSmsVerificationCode',
        payload: {
          phoneNumber: superMobile,
        },
      });
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          count: countCache,
        },
      });
      const interval = setInterval(() => {
        countCache -= 1;
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            count: countCache,
          },
        });
        if (countCache === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    // 更改手机号
    onReset(e) {
      // 打开弹窗
      e.preventDefault();
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          superMobile,
        },
      });
      dispatch({
        type: 'businessInfo/showModal',
        payload: {
         // modalType: 'f4444444',
        },
      });
      dispatch({
        type: 'businessInfo/hideLoading',
      });
    },
  };
  const modalProps = {
    loading,
    maskClosable: false,
    title: '变更管理员手机号',
    visible: modalVisible,
    verificationCode,
    getsuperMobile,
    businessButton,
    count,
    superMobile,
    phoneNumber,
    // 手机号改变
    onChangeMobile(ev) {
      const newVal = ev.target.value;
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          phoneNumber: newVal,
        },
      });
    },
    onChangeName(ev) {
      const newVal = ev.target.value;
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          newSuper: newVal,
        },
      });
    },
    onSubmit(values) {
      dispatch({
        type: 'businessInfo/editBusiness',
        payload: {
          braLogo,
          status,
          superName: newSuper || superName,
          tenAddress,
          tenCity,
          tenDistrict,
          tenEmail,
          tenName,
          tenProvince,
          tenProvinceName,
          tenCityName,
          tenDistrictName,
          superMobile: values.userAccount,
          verificationCode: values.verificationCode,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'businessInfo/hideModal',
      });
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          modalError: false,
          modalErrorValue: null,
        },
      });
    },
    onGetCaptcha() {
      let countCache = 59;
      dispatch({
        type: 'businessInfo/sendSmsVerificationCode',
        payload: {
          phoneNumber: superMobile,
        },
      });
      dispatch({
        type: 'businessInfo/updateState',
        payload: {
          count: countCache,
        },
      });
      const interval = setInterval(() => {
        countCache -= 1;
        dispatch({
          type: 'businessInfo/updateState',
          payload: {
            count: countCache,
          },
        });
        if (countCache === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  };
  return (
    <div>
      <Item {...itemProps} />
      <Modal {...modalProps} />
    </div>
  );
};

BusinessInfo.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(BusinessInfo);

