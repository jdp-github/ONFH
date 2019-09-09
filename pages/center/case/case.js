'use strict';

let constant = require('../../../utils/constant.js');
let util = require('../../../utils/util.js');

const app = getApp();

Page({
    data: {
        loadProgress: 0,
        loadModal: false,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        hidden: true,
        isAdmin: false,

        // --------- filter begin --------- //
        suifangArr: ["未发病", "ARCO I", "ARCO II", "ARCO III", "ARCO IV", "关节置换", "死亡", "失访"],
        fenqiItemArr: ["全部", "ARCO I", "ARCO II", "ARCO III", "ARCO IV", "未发病"],
        leixingItemArr: ["全部", "激素", "酒精", "创伤", "其他", "未发病"],
        fenqiIndex: 0,
        fenqiArr: ['首诊分期:全部', '首诊分期:ARCO I', '首诊分期:ARCO II', '首诊分期:ARCO III', '首诊分期:ARCO IV', '首诊分期:未发病', ],
        leixingIndex: 0,
        leixingArr: ['首诊类型:全部', '首诊类型:激素', '首诊类型:酒精', '首诊类型:创伤', '首诊类型:其他', '首诊类型:未发病', ],
        ziliaoIndex: 0,
        ziliaoArr: ['首诊资料:全部', '首诊资料:未完成', '首诊资料:已完成'],
        zhongjieIndex: 0,
        zhongjieArr: ['随访终结:全部', '随访终结:未终结', '随访终结:已终结'],
        chaoshiIndex: 0,
        chaoshiArr: ['超时未随访:>6（月）', '超时未随访:>12（月）', '超时未随访:>24（月)'],
        statisIndex: 0,
        statisArr: ['按髋统计', '病例数统计'],
        // --------- filter end --------- //

        searchValue: '',
        stateText: '按髋统计',
        stateCount: '',
        caseCount: '',
        kuanCount: '',
        caseList: [],
        selectedCase: {},
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
        this.requestCaseList(this.data.searchValue);
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

    PickerChange(e) {
        let typeIndex = e.currentTarget.dataset.type
        switch (typeIndex) {
            case "1":
                this.setData({
                    fenqiIndex: e.detail.value
                })
                break;
            case "2":
                this.setData({
                    leixingIndex: e.detail.value
                })
                break;
            case "3":
                this.setData({
                    ziliaoIndex: e.detail.value
                })
                break;
            case "4":
                this.setData({
                    zhongjieIndex: e.detail.value
                })
                break;
            case "5":
                this.setData({
                    chaoshiIndex: e.detail.value
                })
                break;
            case "6":
                let statisIndex = e.detail.value
                let stateText = ''
                let stateCount = 0
                if (statisIndex == 0) {
                    stateText = '按髋统计'
                    stateCount = this.data.kuanCount
                } else {
                    stateText = '按病例数统计'
                    stateCount = this.data.caseCount
                }
                this.setData({
                    statisIndex: statisIndex,
                    stateText: stateText,
                    stateCount: stateCount
                })
                break;
        }

    },
    // ======================== event end ======================== //

    onLoad: function(options) {
        this.setData({
            centerId: options.centerId,
            centerName: options.centerName,
            isAdmin: app.globalData.is_admin == '1'
        });
        this.initData()
    },

    initData() {
        this.loadProgress();
        this.requestCaseList(this.data.searchValue);
    },

    requestCaseList: function(searchValue) {
        let that = this;
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.SearchCaseList',
                openid: app.globalData.openid,
                center_id: that.data.centerId,
                keyword: searchValue,
                szfq: that.data.fenqiIndex,
                szlx: that.data.leixingIndex,
                szzl: that.data.ziliaoIndex,
                sfzj: that.data.zhongjieIndex,
                timeout: that.data.chaoshiIndex
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.SearchCaseList:" + JSON.stringify(res))
                if (res.data.data.code == constant.response_success) {
                    for (let i = 0, len = res.data.data.list.length; i < len; i++) {
                        let caseInfo = res.data.data.list[i];
                        // 日期
                        if (caseInfo.create_time == 0) {
                            caseInfo.create_time = "暂无"
                        } else {
                            caseInfo.create_time = util.formatTime(caseInfo.create_time, 'Y-M-D');
                        }

                        caseInfo.arco_left = that.data.fenqiItemArr[caseInfo.leftright[0].arco]
                        caseInfo.leixing_left = that.data.leixingItemArr[caseInfo.leftright[0].leixing]
                        caseInfo.suifang_left = that.data.suifangArr[caseInfo.leftright[0].leixing]
                        caseInfo.sfqk_left = caseInfo.leftright[0].sfqk

                        caseInfo.arco_right = that.data.fenqiItemArr[caseInfo.leftright[1].arco]
                        caseInfo.leixing_right = that.data.leixingItemArr[caseInfo.leftright[1].leixing]
                        caseInfo.suifang_right = that.data.suifangArr[caseInfo.leftright[1].leixing]
                        caseInfo.sfqk_right = caseInfo.leftright[1].sfqk
                    }

                    that.setData({
                        caseList: res.data.data.list,
                        caseCount: res.data.data.case_count,
                        kuanCount: res.data.data.kuan_count,
                        stateCount: res.data.data.kuan_count
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

    getStateValue(state) {
        var stateValue = ""
        if (state == 0) {
            stateValue = "未完成"
        } else if (state == 1) {
            stateValue = "已完成未审核"
        } else if (state == 2) {
            stateValue = "已审核"
        }

        return stateValue
    },

    onRefresh: function(e) {
        this.initData()
    },

    onAddCase: function(e) {
        wx.navigateTo({
            url: '../../center/case/detail/detail?centerId=' + this.data.centerId + "&centerName=" + this.data.centerName + "&case_id="
        });
    },
    onEditCase: function(e) {
        let that = this;
        that.showLoading();
        let caseInfo = e.currentTarget.dataset.case;
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.SetCaseWritingStaff',
                openid: app.globalData.openid,
                case_id: caseInfo.case_id,
                type: 1
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                if (res.data.data.code == 0) {
                    wx.navigateTo({
                        url: '../../center/case/detail/detail?case_id=' + caseInfo.case_id + "&centerId=" + that.data.centerId + "&centerName=" + that.data.centerName
                    });
                } else {
                    that.showModal("ErrModal", res.data.data.msg);
                }
                that.hideLoading();
            },
            fail(res) {
                that.hideLoading();
            }
        });
    },

    onLookCase: function(e) {
        let caseInfo = e.currentTarget.dataset.case;
        wx.navigateTo({
            url: '../../center/case/detail/detail?case_id=' + caseInfo.case_id + "&centerId=" + this.data.centerId + "&centerName=" + this.data.centerName + "&isLook=" + true
        });
    },

    // onLockCase: function(e) {
    //     let that = this;
    //     let selectedCase = e.currentTarget.dataset.case;
    //     let isApprove = selectedCase.state == 2
    //     let title = isApprove ? '解锁中...' : '锁定病历中...';
    //     // 1审批，2解锁
    //     let type = isApprove ? 2 : 1;
    //     that.showLoading();
    //     wx.request({
    //         url: constant.basePath,
    //         data: {
    //             service: 'Case.Approve',
    //             openid: app.globalData.openid,
    //             case_id: selectedCase.case_id,
    //             type: type
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res) {
    //             that.hideLoading();
    //             if (res.data.data.code == constant.response_success) {
    //                 that.requestCaseList(that.data.searchValue, that.data.sortType);
    //             } else {
    //                 that.showModal("ErrModal", res.data.msg);
    //             }
    //         },
    //         fail(res) {
    //             that.hideLoading();
    //         }
    //     })
    // },

    onDeleCase: function(e) {
        let selectedCase = e.currentTarget.dataset.case;
        this.setData({
            selectedCase: selectedCase
        });
        this.showModal("DeleteCaseModal");
    },
    deleCase: function() {
        let that = this;
        that.loadProgress();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.DeleteCase',
                openid: app.globalData.openid,
                case_id: that.data.selectedCase.case_id
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.DeleteCase:" + JSON.stringify(res));
                that.completeProgress();
                if (res.data.data.code == constant.response_success) {
                    that.loadProgress();
                    that.requestCaseList(that.data.searchValue);
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