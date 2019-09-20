'use strict';

let constant = require('../../utils/constant.js');
let util = require('../../utils/util.js');
let regeneratorRuntime = require('../../lib/regenerator-runtime/runtime');

const app = getApp();

Page({
    data: {
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
        title: '',
        currNoticeContent: "",
        currNoticeId: "",
        currIsTop: false,
        // 0:查看，1:新增，2:编辑
        noticeState: 0,
    },

    onLoad: function(options) {
        this.setData({
            centerId: options.centerId,
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
                    that.showToast(res.data.msg);
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
    addNotice() {
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Notice.CreateNotice',
                openid: app.globalData.openid,
                center_id: that.data.centerId,
                content: that.data.currNoticeContent
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Notice.CreateNotice:" + JSON.stringify(res))
                that.hideLoading();
                that.hideModal();
                if (res.data.data.code == constant.response_success) {
                    that.requestNotice()
                } else {
                    that.showToast(res.data.msg);
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
            noticeState: 2,
            modalName: "NoticeDialog"
        })
    },
    edit() {
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Notice.EditNotice',
                openid: app.globalData.openid,
                center_id: that.data.centerId,
                notice_id: e.currentTarget.dataset.item.id,
                content: that.data.currNoticeContent,
                is_top: that.data.currIsTop ? 1 : 0
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Notice.CreateNotice:" + JSON.stringify(res))
                that.hideLoading();
                that.hideModal();
                if (res.data.data.code == constant.response_success) {
                    that.requestNotice()
                } else {
                    that.showToast(res.data.msg);
                }
            },
            fail(res) {
                that.hideModal();
                that.hideLoading();
            }
        });
    },
    onItemClick(e) {
        console.log("onitemclick:" + JSON.stringify(e))
        let that = this
        that.setData({
            noticeState: 0,
            modalName: "NoticeDialog",
            currNoticeContent: e.currentTarget.dataset.item.content,
            currNoticeId: e.currentTarget.dataset.item.id,
            currIsTop: e.currentTarget.dataset.item.is_top == 1
        })

    },
    onTopChange(e) {
        this.setData({
            currIsTop: e.detail.value
        });
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
    onAddNotice: function(e) {
        this.setData({
            modalName: "NoticeDialog",
            noticeState: 1,
            currNoticeContent: "",
            currNoticeId: "",
            currIsTop: false,
        })
    },
    onTitleInput: function(e) {
        this.setData({
            title: e.detail.value
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