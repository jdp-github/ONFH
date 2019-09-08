'use strict';

let constant = require('../../utils/constant.js');
let util = require('../../utils/util.js');

const app = getApp();

Page({
  data: {
    loadProgress: 0,
    loadModal: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,

    sz_arco_arr: ["不适用", " ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "未发病"],
    sf_arco_arr: ["未选择", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "未发病"],

    caseId: '',
    name: '',
    caseNO: '',
    szDate: 0,
    szDateFormat: '',
    searchValue: '',
    startDate: '开始时间',
    endDate: '结束时间',
    followupList: [],
    selectedItem: {},
    errMsg: ''
  },

  // ======================== event begin ======================== //
  loadProgress: function() {
    if (this.data.loadProgress < 96) {
      this.setData({
        loadProgress: this.data.loadProgress + 3
      });
    }
    if (this.data.loadProgress < 100) {
      setTimeout(() => {
        this.loadProgress();
      }, 100);
    } else {
      this.setData({
        loadProgress: 0
      });
    }
  },
  completeProgress: function() {
    this.setData({
      loadProgress: 100
    });
  },
  showToast: function(msg) {
    wx.showToast({
      icon: 'none',
      title: msg,
    });
  },
  showLoading: function() {
    this.setData({
      loadModal: true
    });
  },
  hideLoading: function() {
    setTimeout(() => {
      this.setData({
        loadModal: false
      });
    }, 1500);
  },
  showModal: function(modalName, msg = '') {
    this.setData({
      modalName: modalName,
      errMsg: msg
    });
  },
  hideModal: function(e) {
    this.setData({
      modalName: null
    });
  },
  onPageScroll: function(e) {

  },
  onSearchChange: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },
  onSearch: function() {
    this.loadProgress();
    this.requestFollowupList(this.data.searchValue);
  },

  ListTouchStart: function(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    });
  },
  ListTouchMove: function(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    });
  },
  ListTouchEnd: function(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
    } else {
      this.setData({
        modalName: null
      });
    }
    this.setData({
      ListTouchDirection: null
    });
  },
  bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  // ======================== event end ======================== //

  onLoad: function(options) {
    this.setData({
      caseId: options.case_id,
      name: options.name,
      caseNO: options.caseNO,
      szDate: options.szDate,
      szDateFormat: options.szDateFormat
    });

    this.initData()
  },

  initData() {
    this.loadProgress();
    this.requestFollowupList(this.data.searchValue);
  },

  requestFollowupList: function(searchValue) {
    let that = this;
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Followup.SearchList',
        openid: app.globalData.openid,
        case_id: that.data.caseId,
        keyword: searchValue,
        begin_date: that.data.startDate == "开始时间" ? "" : Date.parse(that.data.startDate) / 1000,
        end_date: that.data.endDate == "结束时间" ? "" : Date.parse(that.data.endDate) / 1000,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Followup.SearchList:" + JSON.stringify(res))
        if (res.data.data.code == constant.response_success) {
          for (let i = 0, len = res.data.data.list.length; i < len; i++) {
            let followupInfo = res.data.data.list[i];
            if (followupInfo.items.length == 1) { // 只有一侧有数据
              if (followupInfo.items[0].side == 1) { // 左侧有数据
                followupInfo.items[0].sz_arco = followupInfo.items[0].sz_arco ? that.data.sz_arco_arr[followupInfo.items[0].sz_arco] : ''
                followupInfo.items[0].sf_arco = followupInfo.items[0].sf_arco ? that.data.sf_arco_arr[followupInfo.items[0].sf_arco] : ''
                followupInfo.items[0].fb_time_desc = followupInfo.items[0].fb_time_desc ? that.makeTimeDesc(followupInfo.items[0].fb_time_desc) : ''
              } else { // 右侧有数据
                followupInfo.items[0].sz_arco = ''
                followupInfo.items[0].sf_arco = ''
                followupInfo.items[0].fb_time_desc = ''
                followupInfo.items[0].sf_shichang = ''
                let infoItem = {}
                followupInfo.items.push(infoItem)
                followupInfo.items[1].sz_arco = followupInfo.items[0].sz_arco ? that.data.sz_arco_arr[followupInfo.items[0].sz_arco] : ''
                followupInfo.items[1].sf_arco = followupInfo.items[0].sf_arco ? that.data.sf_arco_arr[followupInfo.items[0].sf_arco] : ''
                followupInfo.items[1].fb_time_desc = followupInfo.items[0].fb_time_desc ? that.makeTimeDesc(followupInfo.items[0].fb_time_desc) : ''
                followupInfo.items[1].sf_shichang = followupInfo.items[0].sf_shichang
              }
            } else if (followupInfo.items.length > 1) { // 两侧都有数据
              followupInfo.items[0].sz_arco = followupInfo.items[0].sz_arco ? that.data.sz_arco_arr[followupInfo.items[0].sz_arco] : ''
              followupInfo.items[0].sf_arco = followupInfo.items[0].sf_arco ? that.data.sf_arco_arr[followupInfo.items[0].sf_arco] : ''
              followupInfo.items[0].fb_time_desc = followupInfo.items[0].fb_time_desc ? that.makeTimeDesc(followupInfo.items[0].fb_time_desc) : ''
              followupInfo.items[1].sz_arco = followupInfo.items[1].sz_arco ? that.data.sz_arco_arr[followupInfo.items[1].sz_arco] : ''
              followupInfo.items[1].sf_arco = followupInfo.items[1].sf_arco ? that.data.sf_arco_arr[followupInfo.items[1].sf_arco] : ''
              followupInfo.items[1].fb_time_desc = followupInfo.items[1].fb_time_desc ? that.makeTimeDesc(followupInfo.items[1].fb_time_desc) : ''
            }
          }

          that.setData({
            followupList: res.data.data.list
          });
        } else {
          that.showToast(res.data.msg);
        }
        that.completeProgress();
      },
      fail(res) {
        that.completeProgress();
        that.showToast(res.data.msg);
      }
    });
  },

  getDefaultNum(num) {
    return num > 0 ? num : ""
  },

  makeTimeDesc(desc) {
    let timeDesc = ''
    switch (desc) {
      case -1:
        timeDesc = '未发病';
        break;
      case 0:
        timeDesc = '首诊';
        break;
      default:
        timeDesc = '第' + desc + '次随访';
        break;
    }
    return timeDesc
  },

  onRefresh: function(e) {
    this.initData()
  },
  // 新增
  onAddFollowup: function(e) {
    let that = this;
    that.loadProgress();
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Followup.IsClose',
        openid: app.globalData.openid,
        case_id: that.data.caseId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Followup.IsClose:" + JSON.stringify(res));
        that.completeProgress();
        if (res.data.data.code == constant.response_success) {
          let info = res.data.data.info
          if (info.left_close == 1 && info.right_close) {
            that.showToast("两侧都关闭")
          } else {
            wx.navigateTo({
              url: './detail/detail?case_id=' + that.data.caseId + "&isCreateCase=true&szDate=" + that.data.szDate + "&left_close=" + info.left_close + "&right_close=" + info.right_close
            });
          }
        } else {
          that.showModal("ErrModal", res.data.data.msg);
        }
      },
      fail(res) {
        that.completeProgress();
      }
    });

  },
  // 编辑
  onEditCase: function(e) {
    let item = e.currentTarget.dataset.case;
    wx.navigateTo({
      url: './detail/detail?case_id=' + item.case_id + "&times=" + item.times + "&szDate=" + this.data.szDate
    });
  },
  // 查看
  onLookCase: function(e) {
    let item = e.currentTarget.dataset.case;
    wx.navigateTo({
      url: './detail/detail?case_id=' + item.case_id + "&times=" + item.times + "&szDate=" + this.data.szDate + "&isLook=" + true
    });
  },
  // 删除
  onDeleCase: function(e) {
    let selectedItem = e.currentTarget.dataset.case;
    this.setData({
      selectedItem: selectedItem
    });
    this.showModal("DeleteCaseModal");
  },
  deleCase: function() {
    let that = this;
    that.loadProgress();
    let times = that.data.selectedItem.times
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Followup.Delete',
        openid: app.globalData.openid,
        case_id: that.data.caseId,
        times: that.data.selectedItem.times
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Followup.Delete:" + JSON.stringify(res));
        that.completeProgress();
        if (res.data.data.code == constant.response_success) {
          that.loadProgress();
          that.requestFollowupList(that.data.searchValue);
          that.setData({
            modalName: ''
          });
        } else {
          that.showModal("ErrModal", res.data.data.msg);
        }
      },
      fail(res) {
        that.completeProgress();
      }
    });
  },
});