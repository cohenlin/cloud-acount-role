/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Search from '../../components/System/Staff/search';
import List from '../../components/System/Staff/list';
import Modal from '../../components/System/Staff/modal';

const Staff = ({ dispatch, cloudState }) => {
  const {
    visible,
    realname,
    gender,
    mobile,
    provinceName,
    cityName,
    districtName,
    address,
    post,
    searchInfo,
    listPagination,
    title,
    checkedStaff,
    authorityTreeData,
    postList,
    orderby,
    modalKey,
    provinceList,
    cityList,
    districtList,
    staffList,
    deleteBtnStatus,
    startBtnStatus,
    blockBtnStatus,
    checkedStaffId,
    checkedStaffStartId,
    checkedStaffBlockId,
    storeid,
    authStores,
    idCard,
    editStoreId,
    status,
    staffId,
    tenantid,
    province,
    city,
    district,
    loading,
  } = cloudState.staff;
  // 取得staff页面的button权限
  const staffButton = cloudState.account.buttonPermissions.system.set.staff;
  const searchProps = {
    loading,
    searchInfo,
    storeid,
    status,
    orderby,
    checkedStaff,
    deleteBtnStatus, // 删除按钮禁用状态
    startBtnStatus,  // 启用按钮禁用状态
    blockBtnStatus,  // 停用按钮禁用状态
    checkedStaffStartId, // 选中可停用员工id
    checkedStaffBlockId, // 选中可启用员工id
    authorityTreeData,
    checkedStaffId,
    staffButton,
    onAdd() {
      dispatch({
        type: 'staff/updateState',
        payload: {
          realname: '',
          mobile: '',
          post: '',
          gender: 1,
          provinceName: '',
          cityName: '',
          districtName: '',
          address: '',
          authStores: [],
          idCard: '',
          editStoreId: '',
          title: '新增员工',
          staffId: '',
        },
      });
      dispatch({
        type: 'staff/queryProvinceList',
      });
      dispatch({
        type: 'staff/queryPostList',
      });
      dispatch({
        type: 'staff/showModal',
      });
    },
    // 停用
    onBlock() {
      const checkedStaffIds = checkedStaffStartId.join(',');
      dispatch({
        type: 'staff/enableOrDisable',
        payload: {
          ids: checkedStaffIds,
          status: '0',
        },
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          checkedStaffId: [],
          checkedStaff: [],
          checkedStaffStartId: [], // 选中可停用员工id
          checkedStaffBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,
        },
      });
    },
    // 启用
    onStart() {
      const checkedStaffIds = checkedStaffBlockId.join(',');
      dispatch({
        type: 'staff/enableOrDisable',
        payload: {
          ids: checkedStaffIds,
          status: '1',
        },
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          checkedStaffId: [],
          checkedStaff: [],
          checkedStaffStartId: [], // 选中可停用员工id
          checkedStaffBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,

        },
      });
    },
    // 删除
    onDelete() {
      const checkedStaffIds = checkedStaffId.join(',');
      dispatch({
        type: 'staff/deleteStaff',
        payload: {
          ids: checkedStaffIds,
        },
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          checkedStaffId: [],
          checkedStaff: [],
          checkedStaffStartId: [], // 选中可停用员工id
          checkedStaffBlockId: [], // 选中可启用员工id
          deleteBtnStatus: true,
          startBtnStatus: true,
          blockBtnStatus: true,
        },
      });
    },
    // 搜索输入
    onSearchItem(event) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          searchInfo: event.target.value,
        },
      });
    },
    // 清空搜索条件
    onClearSearch() {
      dispatch({
        type: 'staff/updateState',
        payload: {
          searchInfo: '',
        },
      });
    },
    // 搜索按钮
    onSearch() {
      dispatch({
        type: 'staff/queryList',
        payload: {
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
            orderby: (Object.keys(orderby).length === 0) ? {} : orderby,
          },
          key: searchInfo,
          storeids: storeid,
          status,
        },
      });
    },
    // 隶属机构
    onSubsidiaryTreeChange(selectedKeys) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          pageNo: 1,
          storeid: selectedKeys.join(','),
        },
      });
      dispatch({
        type: 'staff/queryList',
        payload: {
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
            orderby: (Object.keys(orderby).length === 0) ? {} : orderby,
          },
          key: searchInfo,
          storeids: selectedKeys.join(','),
          status,
        },
      });
    },
    onChangeStatus(event) {
      dispatch({
        type: 'staff/queryList',
        payload: {
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
            orderby: (Object.keys(orderby).length === 0) ? {} : orderby,
          },
          key: searchInfo,
          storeids: storeid,
          status: event.target.value,
        },
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          status: event.target.value,
        },
      });
    },
  };
  const listProps = {
    listPagination,
    storeid,
    status,
    searchInfo,
    orderby,
    staffList,
    checkedStaffId,
    staffButton,
    loading,
    onEdit(record) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          staffId: record.id,
          title: '编辑员工',
          realname: '',
          mobile: '',
          post: '',
          gender: null,
          provinceName: '',
          cityName: '',
          districtName: '',
          address: '',
          editStoreId: '',
          authStores: [],
          idCard: '',
        },
      });
      dispatch({
        type: 'staff/editStaff',
        payload: {
          id: record.id,
        },
      });
      dispatch({
        type: 'staff/queryProvinceList',
      });
      dispatch({
        type: 'staff/queryPostList',
      });
      dispatch({
        type: 'staff/showModal',
      });
    },
    onDelectStaff(idAarray) {
      const checkedStaffIds = []; // 删除后数组
      const checkedArray = []; // 去除后的状态数组
      const startArray = [];      // 启用按钮数组
      const blockArray = [];      //  停用按钮数组
      checkedStaffId.map((item) => {
        if (idAarray.indexOf(item) < 0) {
          checkedStaffIds.push(item);
        }
        return null;
      });
      checkedStaff.map((item) => {
        if (idAarray.indexOf(item.id) < 0) {
          checkedArray.push(item);
        }
        return null;
      });
      const judgeStartArray = checkedArray.filter(item => item.status === 1);
      const judgeBlockArray = checkedArray.filter(item => item.status === 0);
      judgeStartArray.map((item) => {
        startArray.push(item.id);
        return null;
      });
      judgeBlockArray.map((item) => {
        blockArray.push(item.id);
        return null;
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          deleteBtnStatus: !((checkedArray.length > 0)),
          startBtnStatus: (judgeStartArray.length === checkedArray.length),
          blockBtnStatus: (judgeBlockArray.length === checkedArray.length),
          checkedStaff: checkedArray,
          checkedStaffId: checkedStaffIds,
          checkedStaffStartId: startArray, // 选中可停用员工id
          checkedStaffBlockId: blockArray, // 选中可启用员工id
        },
      });
    },
    // 选择员工
    onSelectStaff(selectedRows, record) {
      const checkedArray = [];   // 状态数组
      const checkedStaffIds = [];  // 员工Id
      record.map((item) => {
        checkedArray.push({ id: item.id, status: item.status });
        checkedStaffIds.push(item.id);
        return null;
      });
      dispatch({
        type: 'staff/updateState',
        payload: {
          checkedStaff: [...checkedStaff, ...checkedArray],
          checkedStaffId: [...checkedStaffIds, ...checkedStaffId],
        },
      });
      dispatch({
        type: 'staff/judgeStatus',
      });
    },
    onChangeSorter(pagination) {
      dispatch({
        type: 'staff/queryList',
        payload: {
          page: {
            pageno: pagination.current, // 查看第几页内容 默认1
            rowcount: pagination.pageSize, // 一页展示条数 默认10
            orderby: (Object.keys(orderby).length === 0) ? {} : orderby,
          },
          key: searchInfo,
          storeids: storeid,
          status,
        },
      });
    },
  };
  const modalProps = {
    loading,
    maskClosable: false,
    visible,
    title,
    staffId,
    tenantid,
    realname,
    mobile,
    province,
    city,
    district,
    gender,
    provinceName,
    cityName,
    districtName,
    address,
    post,
    storeid,
    authStores,
    idCard,
    postList,
    provinceList,
    cityList,
    districtList,
    authorityTreeData,
    editStoreId,
    key: modalKey,
    onChange(value) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          authStores: value,
        },
      });
    },
    onSubmit(value) {
      const {
        post_id,
        stores,
        id_card,
      } = value;
      dispatch({
        type: 'staff/addStaff',
        payload: {
          id: staffId,
          tenantId: tenantid,
          storeId: value.editStoreId,
          province,
          city,
          district,
          postId: post_id,
          authStores: stores,
          idCard: id_card,
          realname: value.realname,
          mobile: value.mobile,
          gender: value.gender,
          address: value.address,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'staff/updateState',
        payload: {
          visible: false,
          staffId: '',
        },
      });
    },
    onProvinceChange(selectedKeys, info) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          province: selectedKeys,
          provinceName: info.props.children,
          city: '',
          district: '',
          cityName: '请选择',
          districtName: '请选择',
        },
      });
      dispatch({
        type: 'staff/queryAreaListByParentId',
        payload: {
          parentid: selectedKeys,
          flag: 'provinceClick',
        },
      });
    },
    onCityChange(selectedKeys, info) {
      dispatch({
        type: 'staff/updateState',
        payload: {
          city: selectedKeys,
          cityName: info.props.children,
        },
      });
      dispatch({
        type: 'staff/queryAreaListByParentId',
        payload: {
          parentid: selectedKeys,
          flag: 'cityClick',
        },
      });
    },
    onDistrictChange(selectedKeys, info) {
      console.log('key', selectedKeys);
      dispatch({
        type: 'staff/updateState',
        payload: {
          district: selectedKeys,
          districtName: info.props.children,

        },
      });
    },
  };
  return (
    // noinspection JSAnnotator
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
    </div>
  );
};
function mapStateToProps(cloudState) {
  return { cloudState };
}

Staff.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)(Staff);
