'use strict';

let constant = require('../../utils/constant.js');
let util = require('../../utils/util.js');
let regeneratorRuntime = require('../../lib/regenerator-runtime/runtime');

const app = getApp();

const VIEW_STATE = 0;
const ADD_STATE = 1;
const EDIT_STATE = 2;

Page({
  data: {
    currAvatar: '',
    currDate: '',
    loadProgress: 0,
    loadModal: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    modalName: "",
    searchValue: "",
    emitter: null,
    centerId: '',
    noticeList: [],

    selectedItem: {},
    currNoticeTitle: '',
    currNoticeContent: "",
    currNoticeId: "",
    currIsTop: false,
    currNoticeDate: '',
    // 0:查看，1:新增，2:编辑
    noticeState: VIEW_STATE,
  },

  onLoad: function(options) {
    this.setData({
      centerId: options.centerId,
      currAvatar: app.globalData.avatarUrl,
      currNoticeDate: util.formatTime(new Date() / 1000, 'Y-M-D')
    });
    this.initData();
  },
  initData: async function() {
    await this.requestNotice();
  },
  requestNotice() {
    let that = this;
    that.showLoading();
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Notice.GetNoticeList',
        keyword: that.data.searchValue
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Notice.GetNoticeList:" + JSON.stringify(res))
        that.hideLoading();
        if (res.data.data.code == constant.response_success) {
          for (let i = 0, length = res.data.data.list.length; i < length; i++) {
            let item = res.data.data.list[i];
            if (item.ctime != null) {
              item.ctime = util.formatTime(item.ctime, 'Y-M-D');
            }
          }
          that.setData({
            noticeList: res.data.data.list
          });
        } else {
          that.showToast(res.data.data.msg);
        }
      },
      fail(res) {
        that.hideLoading();
      }
    });
  },
  onSearch() {
    this.requestNotice()
  },
  refresh() {
    this.setData({
      searchValue: ""
    })
    this.requestNotice()
  },
  onDele(e) {
    this.setData({
      modalName: 'DeleteNoticeModal',
      selectedItem: e.currentTarget.dataset.item
    })
  },
  dele(e) {
    let that = this;
    that.showLoading();
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Notice.DeleteNotice',
        openid: app.globalData.openid,
        center_id: that.data.centerId,
        notice_id: that.data.selectedItem.id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Notice.DeleteNotice:" + JSON.stringify(res))
        that.hideLoading();
        that.hideModal();
        if (res.data.data.code == constant.response_success) {
          that.requestNotice()
        } else {
          that.showToast(res.data.data.msg);
        }
      },
      fail(res) {
        that.hideLoading();
        that.hideModal();
      }
    });
  },
  onAddNotice: function(e) {
    this.setData({
      modalName: "NoticeDialog",
      noticeState: ADD_STATE,
      currNoticeContent: "",
      currNoticeTitle: "",
      currNoticeId: "",
      currAvatar: app.globalData.avatarUrl,
      currIsTop: false,
    })
  },
  addNotice() {
    let that = this;
    that.showLoading();
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Notice.CreateNotice',
        openid: app.globalData.openid,
        center_id: that.data.centerId,
        title: that.data.currNoticeTitle,
        content: that.data.currNoticeContent
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Notice.CreateNotice:" + JSON.stringify(res))
        that.hideLoading();
        that.hideModal();
        that.clearData()
        if (res.data.data.code == constant.response_success) {
          that.requestNotice()
        } else {
          that.showToast(res.data.data.msg);
        }
      },
      fail(res) {
        that.hideModal();
        that.hideLoading();
      }
    });
  },
  onEdit(e) {
    this.setData({
      noticeState: EDIT_STATE,
      modalName: "NoticeDialog",
      currNoticeContent: e.currentTarget.dataset.item.content,
      currNoticeTitle: e.currentTarget.dataset.item.title,
      currNoticeId: e.currentTarget.dataset.item.id,
      currAvatar: e.currentTarget.dataset.item.staff_avatar,
      currIsTop: e.currentTarget.dataset.item.is_top == 1
    })
  },
  editNotice() {
    let that = this;
    that.showLoading();
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Notice.EditNotice',
        openid: app.globalData.openid,
        center_id: that.data.centerId,
        notice_id: that.data.currNoticeId,
        content: that.data.currNoticeContent,
        title: that.data.currNoticeTitle,
        is_top: that.data.currIsTop ? 1 : 0
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Notice.EditNotice:" + JSON.stringify(res))
        that.hideLoading();
        that.hideModal();
        that.clearData()
        if (res.data.data.code == constant.response_success) {
          that.requestNotice()
        } else {
          that.showToast(res.data.data.msg);
        }
      },
      fail(res) {
        that.hideModal();
        that.hideLoading();
      }
    });
  },
  showNotice(e) {
    let that = this
    that.setData({
      noticeState: VIEW_STATE,
      modalName: "NoticeDialog",
      currNoticeContent: e.currentTarget.dataset.item.content,
      currNoticeTitle: e.currentTarget.dataset.item.title,
      currNoticeId: e.currentTarget.dataset.item.id,
      currAvatar: e.currentTarget.dataset.item.staff_avatar,
      currIsTop: e.currentTarget.dataset.item.is_top == 1
    })
  },
  onTopChange(e) {
    let that = this;
    wx.request({
      url: constant.basePath,
      data: {
        service: 'Notice.SetTop',
        openid: app.globalData.openid,
        center_id: that.data.centerId,
        notice_id: that.data.currNoticeId,
        is_top: e.detail.value ? 1 : 0
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("Notice.SetTop:" + JSON.stringify(res))
        if (res.data.data.code == constant.response_success) {
          that.setData({
            currIsTop: e.detail.value
          });
        } else {
          that.showToast(res.data.data.msg);
        }
      },
    });

  },
  onSubmit(e) {
    if (this.data.noticeState == EDIT_STATE) {
      this.editNotice()
    } else if (this.data.noticeState == ADD_STATE) {
      this.addNotice()
    }
  },
  clearData() {
    this.setData({
      selectedItem: {},
      currNoticeTitle: '',
      currNoticeContent: '',
      currNoticeId: '',
      currIsTop: false,
      currNoticeDate: '',
      noticeState: VIEW_STATE
    })
  },
  // ============== UI begin ============== //
  onHide: function() {
    this.setData({
      modalName: ''
    });
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        emitter: app.globalData.emitter
      });
      app.globalData.emitter.on('addEmitter', () => {
        console.log("person modal");
      });
    }
  },
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
    }, 500);
  },
  hideModal: function(e) {
    this.setData({
      modalName: null
    });
  },
  onTitleInput: function(e) {
    this.setData({
      currNoticeTitle: e.detail.value
    });
  },
  onNoticeInput: function(e) {
    this.setData({
      currNoticeContent: e.detail.value
    });
  },
  onSearchChange: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
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
  // ============== UI end ============== //

});