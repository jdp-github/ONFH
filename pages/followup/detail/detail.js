'use strict';

let constant = require('../../../utils/constant.js');
let util = require('../../../utils/util.js');

const app = getApp();

Page({
    data: {
        showImageModal: false,
        modalImage: '',
        loadProgress: 0,
        loadModal: false,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        isAdmin: false,
        // -------- modal begin ----------- //
        modalName: '',
        imageModalName: '上传图片',
        imageType: '',
        errMsg: '',
        // -------- modal end ------------- //
        // -------- tab切换 begin -------- //
        TabCur: 0,
        VerticalNavTop: 0,
        TabTitle: ['左髋', '右髋'],
        // ShowBasic: true,
        ShowDiagnose: true,
        ShowAdmission: false,
        // -------- tab切换 end -------- //

        // -------- 公用信息 begin -------- //
        caseId: '',
        isCreateCase: '',
        followupId: '',
        isLook: false,
        followupInfo: {},
        szDate: 0,
        times: '',
        // addAvatar: '',
        // updateAvatarArr: [],
        // approveAvatar: '',
        // -------- 公用信息 end -------- //

        // -------- 左侧 begin -------- //
        // 随访日期
        sfDate: '请选择日期',
        sfDateDisabled: false,
        // 距离首诊时长
        szscValue: '',
        // 随访情况
        sfqkIndex: 0,
        sfqkPicker: ["请选择", "未发病", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "关节置换", "死亡", "失访"],
        sfqkDisabled: false,
        // 终结本侧日后随访
        zjbcIndex: 0,
        zjbcPicker: ["请选择", "否", "是"],
        zjbcDisabled: false,
        // 是否遵从前次治疗方案
        sfzcIndex: 0,
        sfzcPicker: ["请选择", "是", "部分遵从", "否"],
        sfzcDisabled: false,
        // 更改方案说明
        ggfaValue: '',
        ggfaDisabled: false,
        // ARCO
        arcoIndex: 0,
        arcoPicker: ["请选择", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "未发病"],
        arcoDisabled: false,
        // harris
        harris: '',
        harrisImgArr: [],
        harrisDisabled: false,
        // VAS
        vasIndex: 0,
        vasPicker: ["请选择", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        vasImgArr: [],
        vasDisabled: false,
        // x光左
        xleftIndex: 0,
        xleftPicker: ["请选择", "已拍", "未拍"],
        xleftImgArr: [],
        xleftDisabled: false,
        // CT左
        ctLeftIndex: 0,
        ctLeftPicker: ["请选择", "已拍", "未拍"],
        ctLeftImgArr: [],
        ctLeftDisabled: false,
        // MRI左
        mriLeftIndex: 0,
        mriLeftPicker: ["请选择", "已拍", "未拍"],
        mriLeftImgArr: [],
        mriLeftDisabled: false,
        // 本次治疗方法
        bczlIndex: 0,
        bczlPicker: ["请选择", "无治疗", "药物治疗", "钻孔减压", "保髋手术", "其他"],
        bczlDisabled: false,
        // 具体治疗措施
        jtzl: '',
        jtzlDisabled: false,
        // 备注
        beizhu: '',
        beizhuDisabled: '',
        // -------- 左侧 end -------- //

        // -------- 右侧 begin -------- //
        // 随访日期
        sfDate_R: '请选择日期',
        sfDateDisabled_R: false,
        // 距离首诊时长
        szscValue_R: '',
        // 随访情况
        sfqkIndex_R: 0,
        sfqkPicker_R: ["请选择", "未发病", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "关节置换", "死亡", "失访"],
        sfqkDisabled_R: false,
        // 终结本侧日后随访
        zjbcIndex_R: 0,
        zjbcPicker_R: ["请选择", "否", "是"],
        zjbcDisabled_R: false,
        // 是否遵从前次治疗方案
        sfzcIndex_R: 0,
        sfzcPicker_R: ["请选择", "是", "部分遵从", "否"],
        sfzcDisabled_R: false,
        // 更改方案说明
        ggfaValue_R: '',
        ggfaDisabled_R: false,
        // ARCO
        arcoIndex_R: 0,
        arcoPicker_R: ["请选择", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "未发病"],
        // harris
        harris_R: '',
        harrisImgArr_R: [],
        // VAS
        vasIndex_R: 0,
        vasPicker_R: ["请选择", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        vasImgArr_R: [],
        // x光左
        xleftIndex_R: 0,
        xleftPicker_R: ["请选择", "已拍", "未拍"],
        xleftImgArr_R: [],
        // CT左
        ctLeftIndex_R: 0,
        ctLeftPicker_R: ["请选择", "已拍", "未拍"],
        ctLeftImgArr_R: [],
        // MRI左
        mriLeftIndex_R: 0,
        mriLeftPicker_R: ["请选择", "已拍", "未拍"],
        mriLeftImgArr_R: [],
        // 本次治疗方法
        bczlIndex_R: 0,
        bczlPicker_R: ["请选择", "无治疗", "药物治疗", "钻孔减压", "手术", "其他"],
        bczlDisabled_R: false,
        // 具体治疗措施
        jtzl_R: '',
        jtzlDisabled_R: false,
        // 备注
        beizhu_R: '',
        beizhuDisabled_R: '',
        // -------- 右侧 end -------- //

        // ------- 图片上传 start --------- //
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
        pic5: '',
        pic6: '',
        pic7: '',
        pic8: '',
        pic9: '',
        // ------- 图片上传 end  ---------- //
    },

    tabSelect: function(e) {
        let tabId = e.currentTarget.dataset.id;
        switch (tabId) {
            case 0:
                this.setData({
                    TabCur: tabId,
                    VerticalNavTop: (tabId - 1) * 50,
                    ShowDiagnose: true,
                    ShowAdmission: false,
                });
                // if (!this.data.isCreateCase) {
                //     this.setData({
                //         addAvatar: this.data.followupInfo.left.creator_avatar,
                //         updateAvatarArr: this.makeUpdateAvatar(this.data.followupInfo.left.editor_list),
                //         approveAvatar: this.data.followupInfo.left.auditor_avatar,
                //     })
                // }
                break;
            case 1:
                this.setData({
                    TabCur: tabId,
                    VerticalNavTop: (tabId - 1) * 50,
                    ShowDiagnose: false,
                    ShowAdmission: true,
                });
                // if (!this.data.isCreateCase) {
                //     this.setData({
                //         addAvatar: this.data.followupInfo.right.creator_avatar,
                //         updateAvatarArr: this.makeUpdateAvatar(this.data.followupInfo.right.editor_list),
                //         approveAvatar: this.data.followupInfo.right.auditor_avatar,
                //     })
                // }
                break;
        }
    },

    // -------- 左侧 begin -------- //
    onTimesInput: function(e) {
        this.setData({
            times: e.detail.value
        });
    },
    onSfDateChange: function(e) {
        let dateDiff = Date.parse(e.detail.value) - this.data.szDate;
        dateDiff = Math.floor(dateDiff / (24 * 3600 * 1000 * 30))
        this.setData({
            sfDate: e.detail.value,
            szscValue: dateDiff + "月"
        });
    },
    onSfDateSwitchChange: function(e) {
        this.setData({
            sfDateDisabled: !e.detail.value
        });
        if (this.data.sfDateDisabled) {
            this.setData({
                sfDate: '请选择日期',
                szscValue: ''
            });
        }
    },
    onSfqkChange: function(e) {
        this.setData({
            sfqkIndex: e.detail.value,
        });
    },
    onSfqkSwitchChange: function(e) {
        this.setData({
            sfqkDisabled: !e.detail.value
        });
        if (this.data.sfqkDisabled) {
            this.setData({
                sfqkIndex: 0
            });
        }
    },
    onZjbcChange: function(e) {
        this.setData({
            zjbcIndex: e.detail.value,
        });
    },
    onZjbcSwitchChange: function(e) {
        this.setData({
            zjbcDisabled: !e.detail.value
        });
        if (this.data.zjbcDisabled) {
            this.setData({
                zjbcIndex: 0
            });
        }
    },
    onSfzcChange: function(e) {
        this.setData({
            sfzcIndex: e.detail.value,
        });
    },
    onSfzcSwitchChange: function(e) {
        this.setData({
            sfzcDisabled: !e.detail.value
        });
        if (this.data.sfzcDisabled) {
            this.setData({
                sfzcIndex: 0
            });
        }
    },
    onGgfaInput: function(e) {
        this.setData({
            ggfaValue: e.detail.value
        });
    },
    onGgfaSwitchChange: function(e) {
        this.setData({
            ggfaDisabled: !e.detail.value
        });
        if (this.data.ggfaDisabled) {
            this.setData({
                ggfaValue: ''
            });
        }
    },
    onArcoChange: function(e) {
        this.setData({
            arcoIndex: e.detail.value,
        });
    },
    onArcoSwitchChange: function(e) {
        this.setData({
            arcoDisabled: !e.detail.value
        });
        if (this.data.arcoDisabled) {
            this.setData({
                arcoIndex: 0
            });
        }
    },
    onHarrisInput: function(e) {
        this.setData({
            harris: e.detail.value
        });
    },
    onHarrisSwitchChange: function(e) {
        this.setData({
            harrisDisabled: !e.detail.value
        });
        if (this.data.harrisDisabled) {
            this.setData({
                harris: '',
                harrisImgArr: []
            });
        }
    },
    onVASChange: function(e) {
        this.setData({
            vasIndex: e.detail.value,
        });
    },
    onVasSwitchChange: function(e) {
        this.setData({
            vasDisabled: !e.detail.value
        });
        if (this.data.vasDisabled) {
            this.setData({
                vasIndex: 0,
                vasImgArr: []
            });
        }
    },
    onXLeftChange: function(e) {
        this.setData({
            xleftIndex: e.detail.value,
        });
    },
    onXLeftSwitchChange: function(e) {
        this.setData({
            xleftDisabled: !e.detail.value
        });
        if (this.data.xleftDisabled) {
            this.setData({
                xleftIndex: 0,
                xleftImgArr: []
            });
        }
    },
    onCTLeftChange: function(e) {
        this.setData({
            ctLeftIndex: e.detail.value,
        });
    },
    onCTLeftSwitchChange: function(e) {
        this.setData({
            ctLeftDisabled: !e.detail.value
        });
        if (this.data.ctLeftDisabled) {
            this.setData({
                ctLeftIndex: 0,
                ctLeftImgArr: []
            });
        }
    },
    onMRILeftChange: function(e) {
        this.setData({
            mriLeftIndex: e.detail.value,
        });
    },
    onMriLeftSwitchChange: function(e) {
        this.setData({
            mriLeftDisabled: !e.detail.value
        });
        if (this.data.mriLeftDisabled) {
            this.setData({
                mriLeftIndex: 0,
                mriLeftImgArr: []
            });
        }
    },
    onBczlChange: function(e) {
        this.setData({
            bczlIndex: e.detail.value,
        });
    },
    onBczlSwitchChange: function(e) {
        this.setData({
            bczlDisabled: !e.detail.value
        });
        if (this.data.bczlDisabled) {
            this.setData({
                bczlIndex: 0
            })
        }
    },
    onJtzlInput: function(e) {
        this.setData({
            jtzl: e.detail.value
        });
    },
    onJtzlSwitchChange: function(e) {
        this.setData({
            jtzlDisabled: !e.detail.value
        });
        if (this.data.jtzlDisabled) {
            this.setData({
                jtzl: ''
            });
        }
    },
    onBeizhuInput: function(e) {
        this.setData({
            beizhu: e.detail.value
        });
    },
    onBeizhuSwitchChange: function(e) {
        this.setData({
            beizhuDisabled: !e.detail.value
        });
        if (this.data.beizhuDisabled) {
            this.setData({
                beizhu: ''
            });
        }
    },
    // -------- 左侧 end -------- //

    // -------- 右侧 begin -------- //
    onSfDateChange_R: function(e) {
        let dateDiff = Date.parse(e.detail.value) - this.data.szDate;
        dateDiff = Math.floor(dateDiff / (24 * 3600 * 1000 * 30))

        this.setData({
            sfDate_R: e.detail.value,
            szscValue_R: dateDiff + "月"
        });
    },
    onSfDateSwitchChange_R: function(e) {
        this.setData({
            sfDateDisabled_R: !e.detail.value
        });
        if (this.data.sfDateDisabled_R) {
            this.setData({
                sfDate_R: '请选择日期',
                szscValue_R: ''
            });
        }
    },
    onSfqkChange_R: function(e) {
        this.setData({
            sfqkIndex_R: e.detail.value,
        });
    },
    onSfqkSwitchChange_R: function(e) {
        this.setData({
            sfqkDisabled_R: !e.detail.value
        });
        if (this.data.sfqkDisabled_R) {
            this.setData({
                sfqkIndex_R: 0
            });
        }
    },
    onZjbcChange_R: function(e) {
        this.setData({
            zjbcIndex_R: e.detail.value,
        });
    },
    onZjbcSwitchChange_R: function(e) {
        this.setData({
            zjbcDisabled_R: !e.detail.value
        });
        if (this.data.zjbcDisabled_R) {
            this.setData({
                zjbcIndex_R: 0
            });
        }
    },
    onSfzcChange_R: function(e) {
        this.setData({
            sfzcIndex_R: e.detail.value,
        });
    },
    onSfzcSwitchChange_R: function(e) {
        this.setData({
            sfzcDisabled_R: !e.detail.value
        });
        if (this.data.sfzcDisabled_R) {
            this.setData({
                sfzcIndex_R: 0
            });
        }
    },
    onGgfaInput_R: function(e) {
        this.setData({
            ggfaValue_R: e.detail.value
        });
    },
    onGgfaSwitchChange_R: function(e) {
        this.setData({
            ggfaDisabled_R: !e.detail.value
        });
        if (this.data.ggfaDisabled_R) {
            this.setData({
                ggfaValue_R: ''
            });
        }
    },
    onArcoChange_R: function(e) {
        this.setData({
            arcoIndex_R: e.detail.value,
        });
    },
    onArcoSwitchChange_R: function(e) {
        this.setData({
            arcoDisabled_R: !e.detail.value
        });
        if (this.data.arcoDisabled_R) {
            this.setData({
                arcoIndex_R: 0
            });
        }
    },
    onHarrisInput_R: function(e) {
        this.setData({
            harris_R: e.detail.value
        });
    },
    onHarrisSwitchChange_R: function(e) {
        this.setData({
            harrisDisabled_R: !e.detail.value
        });
        if (this.data.harrisDisabled_R) {
            this.setData({
                harris_R: '',
                harrisImgArr_R: []
            });
        }
    },
    onVASChange_R: function(e) {
        this.setData({
            vasIndex_R: e.detail.value,
        });
    },
    onVasSwitchChange_R: function(e) {
        this.setData({
            vasDisabled_R: !e.detail.value
        });
        if (this.data.vasDisabled_R) {
            this.setData({
                vasIndex_R: 0,
                vasImgArr_R: []
            });
        }
    },
    onXLeftChange_R: function(e) {
        this.setData({
            xleftIndex_R: e.detail.value,
        });
    },
    onXLeftSwitchChange_R: function(e) {
        this.setData({
            xleftDisabled_R: !e.detail.value
        });
        if (this.data.xleftDisabled_R) {
            this.setData({
                xleftIndex_R: 0,
                xleftImgArr_R: []
            });
        }
    },
    onCTLeftChange_R: function(e) {
        this.setData({
            ctLeftIndex_R: e.detail.value,
        });
    },
    onCTLeftSwitchChange_R: function(e) {
        this.setData({
            ctLeftDisabled_R: !e.detail.value
        });
        if (this.data.ctLeftDisabled_R) {
            this.setData({
                ctLeftIndex_R: 0,
                ctLeftImgArr_R: []
            });
        }
    },
    onMRILeftChange_R: function(e) {
        this.setData({
            mriLeftIndex_R: e.detail.value,
        });
    },
    onMriLeftSwitchChange_R: function(e) {
        this.setData({
            mriLeftDisabled_R: !e.detail.value
        });
        if (this.data.mriLeftDisabled_R) {
            this.setData({
                mriLeftIndex_R: 0,
                mriLeftImgArr_R: []
            });
        }
    },
    onBczlChange_R: function(e) {
        this.setData({
            bczlIndex_R: e.detail.value,
        });
    },
    onBczlSwitchChange_R: function(e) {
        this.setData({
            bczlDisabled_R: !e.detail.value
        });
        if (this.data.bczlDisabled_R) {
            this.setData({
                bczlIndex_R: 0
            })
        }
    },
    onJtzlInput_R: function(e) {
        this.setData({
            jtzl_R: e.detail.value
        });
    },
    onJtzlSwitchChange_R: function(e) {
        this.setData({
            jtzlDisabled_R: !e.detail.value
        });
        if (this.data.jtzlDisabled_R) {
            this.setData({
                jtzl_R: ''
            });
        }
    },
    onBeizhuInput_R: function(e) {
        this.setData({
            beizhu_R: e.detail.value
        });
    },
    onBeizhuSwitchChange_R: function(e) {
        this.setData({
            beizhuDisabled_R: !e.detail.value
        });
        if (this.data.beizhuDisabled_R) {
            this.setData({
                beizhu_R: ''
            });
        }
    },
    // -------- 右侧 end -------- //

    // -------- 提示框 begin -------- //
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
    // -------- 提示框 end -------- //

    // -------- 模态对话框 start -------- //
    showModal: function(e, errMessage = '') {
        let that = this
        if (e.currentTarget) {
            this.setData({
                modalName: e.currentTarget.dataset.target,
                imageType: e.currentTarget.dataset.imgtype
            });
            if (that.data.imageType == "Harris") {
                that.setData({
                    pic1: that.data.harrisImgArr[0] ? that.data.harrisImgArr[0].pic : "",
                    pic2: that.data.harrisImgArr[1] ? that.data.harrisImgArr[1].pic : "",
                    pic3: that.data.harrisImgArr[2] ? that.data.harrisImgArr[2].pic : ""
                })
            } else if (that.data.imageType == "VAS") {
                that.setData({
                    pic1: that.data.vasImgArr[0] ? that.data.vasImgArr[0].pic : "",
                    pic2: that.data.vasImgArr[1] ? that.data.vasImgArr[1].pic : "",
                    pic3: that.data.vasImgArr[2] ? that.data.vasImgArr[2].pic : ""
                })
            } else if (that.data.imageType == "X-LEFT") {
                that.setData({
                    pic4: that.data.xleftImgArr[0] ? that.data.xleftImgArr[0].pic : "",
                    pic5: that.data.xleftImgArr[1] ? that.data.xleftImgArr[1].pic : "",
                    pic6: that.data.xleftImgArr[2] ? that.data.xleftImgArr[2].pic : "",
                    pic7: that.data.xleftImgArr[3] ? that.data.xleftImgArr[3].pic : "",
                    pic8: that.data.xleftImgArr[4] ? that.data.xleftImgArr[4].pic : "",
                    pic9: that.data.xleftImgArr[5] ? that.data.xleftImgArr[5].pic : ""
                })
            } else if (that.data.imageType == "CT-LEFT") {
                that.setData({
                    pic4: that.data.ctLeftImgArr[0] ? that.data.ctLeftImgArr[0].pic : "",
                    pic5: that.data.ctLeftImgArr[1] ? that.data.ctLeftImgArr[1].pic : "",
                    pic6: that.data.ctLeftImgArr[2] ? that.data.ctLeftImgArr[2].pic : "",
                    pic7: that.data.ctLeftImgArr[3] ? that.data.ctLeftImgArr[3].pic : "",
                    pic8: that.data.ctLeftImgArr[4] ? that.data.ctLeftImgArr[4].pic : "",
                    pic9: that.data.ctLeftImgArr[5] ? that.data.ctLeftImgArr[5].pic : ""
                })
            } else if (that.data.imageType == "MRI-LEFT") {
                that.setData({
                    pic4: that.data.mriLeftImgArr[0] ? that.data.mriLeftImgArr[0].pic : "",
                    pic5: that.data.mriLeftImgArr[1] ? that.data.mriLeftImgArr[1].pic : "",
                    pic6: that.data.mriLeftImgArr[2] ? that.data.mriLeftImgArr[2].pic : "",
                    pic7: that.data.mriLeftImgArr[3] ? that.data.mriLeftImgArr[3].pic : "",
                    pic8: that.data.mriLeftImgArr[4] ? that.data.mriLeftImgArr[4].pic : "",
                    pic9: that.data.mriLeftImgArr[5] ? that.data.mriLeftImgArr[5].pic : ""
                })
            } else if (that.data.imageType == "Harris_R") {
                that.setData({
                    pic1: that.data.harrisImgArr_R[0] ? that.data.harrisImgArr_R[0].pic : "",
                    pic2: that.data.harrisImgArr_R[1] ? that.data.harrisImgArr_R[1].pic : "",
                    pic3: that.data.harrisImgArr_R[2] ? that.data.harrisImgArr_R[2].pic : ""
                })
            } else if (that.data.imageType == "VAS_R") {
                that.setData({
                    pic1: that.data.vasImgArr_R[0] ? that.data.vasImgArr_R[0].pic : "",
                    pic2: that.data.vasImgArr_R[1] ? that.data.vasImgArr_R[1].pic : "",
                    pic3: that.data.vasImgArr_R[2] ? that.data.vasImgArr_R[2].pic : ""
                })
            } else if (that.data.imageType == "X-LEFT_R") {
                that.setData({
                    pic4: that.data.xleftImgArr_R[0] ? that.data.xleftImgArr_R[0].pic : "",
                    pic5: that.data.xleftImgArr_R[1] ? that.data.xleftImgArr_R[1].pic : "",
                    pic6: that.data.xleftImgArr_R[2] ? that.data.xleftImgArr_R[2].pic : "",
                    pic7: that.data.xleftImgArr_R[3] ? that.data.xleftImgArr_R[3].pic : "",
                    pic8: that.data.xleftImgArr_R[4] ? that.data.xleftImgArr_R[4].pic : "",
                    pic9: that.data.xleftImgArr_R[5] ? that.data.xleftImgArr_R[5].pic : ""
                })
            } else if (that.data.imageType == "CT-LEFT_R") {
                that.setData({
                    pic4: that.data.ctLeftImgArr_R[0] ? that.data.ctLeftImgArr_R[0].pic : "",
                    pic5: that.data.ctLeftImgArr_R[1] ? that.data.ctLeftImgArr_R[1].pic : "",
                    pic6: that.data.ctLeftImgArr_R[2] ? that.data.ctLeftImgArr_R[2].pic : "",
                    pic7: that.data.ctLeftImgArr_R[3] ? that.data.ctLeftImgArr_R[3].pic : "",
                    pic8: that.data.ctLeftImgArr_R[4] ? that.data.ctLeftImgArr_R[4].pic : "",
                    pic9: that.data.ctLeftImgArr_R[5] ? that.data.ctLeftImgArr_R[5].pic : ""
                })
            } else if (that.data.imageType == "MRI-LEFT_R") {
                that.setData({
                    pic4: that.data.mriLeftImgArr_R[0] ? that.data.mriLeftImgArr_R[0].pic : "",
                    pic5: that.data.mriLeftImgArr_R[1] ? that.data.mriLeftImgArr_R[1].pic : "",
                    pic6: that.data.mriLeftImgArr_R[2] ? that.data.mriLeftImgArr_R[2].pic : "",
                    pic7: that.data.mriLeftImgArr_R[3] ? that.data.mriLeftImgArr_R[3].pic : "",
                    pic8: that.data.mriLeftImgArr_R[4] ? that.data.mriLeftImgArr_R[4].pic : "",
                    pic9: that.data.mriLeftImgArr_R[5] ? that.data.mriLeftImgArr_R[5].pic : ""
                })
            }
        } else {
            this.setData({
                modalName: e,
                errMsg: errMessage
            });
        }
    },
    hideModal: function(e) {
        this.setData({
            modalName: null
        });
    },
    showImageModal: function(e) {
        if (e.target.dataset.img && e.target.dataset.img != '') {
            this.setData({
                showImageModal: true,
                modalImage: e.target.dataset.img
            });
        }
    },
    hideImageModal: function(e) {
        this.setData({
            showImageModal: false,
        });
    },
    // -------- 模态对话框 end  -------- //

    // -------- 上传图片 start --------- //
    onChooseImage: function(e) {
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths;
                that.uploadImg(e.target.dataset.le, tempFilePaths[0])
            }
        });
    },
    uploadImg(le, filePath) {
        let that = this;
        that.showLoading();
        wx.uploadFile({
            url: constant.basePath + "",
            filePath: filePath,
            name: "file",
            formData: {
                service: 'Common.Upload'
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success(res) {
                that.hideLoading();
                let data = JSON.parse(res.data);
                if (data.data.code == 0) {
                    switch (le) {
                        case "11":
                            that.setData({
                                pic1: data.data.info.url,
                            })
                            let img11 = {};
                            img11.pic = data.data.info.url;
                            img11.picUpload = data.data.info.file;
                            if (that.data.imageType == "Harris") {
                                that.data.harrisImgArr[0] = img11;
                            } else if (that.data.imageType == "VAS") {
                                that.data.vasImgArr[0] = img11;
                            } else if (that.data.imageType == "Harris_R") {
                                that.data.harrisImgArr_R[0] = img11;
                            } else if (that.data.imageType == "VAS_R") {
                                that.data.vasImgArr_R[0] = img11;
                            }
                            break;
                        case "12":
                            that.setData({
                                pic2: data.data.info.url
                            })
                            let img12 = {};
                            img12.pic = data.data.info.url;
                            img12.picUpload = data.data.info.file;
                            if (that.data.imageType == "Harris") {
                                that.data.harrisImgArr[1] = img12;
                            } else if (that.data.imageType == "VAS") {
                                that.data.vasImgArr[1] = img12;
                            } else if (that.data.imageType == "Harris_R") {
                                that.data.harrisImgArr_R[1] = img12;
                            } else if (that.data.imageType == "VAS_R") {
                                that.data.vasImgArr_R[1] = img12;
                            }
                            break;
                        case "13":
                            that.setData({
                                pic3: data.data.info.url
                            })
                            let img13 = {};
                            img13.pic = data.data.info.url;
                            img13.picUpload = data.data.info.file;
                            if (that.data.imageType == "Harris") {
                                that.data.harrisImgArr[2] = img13;
                            } else if (that.data.imageType == "VAS") {
                                that.data.vasImgArr[2] = img13;
                            } else if (that.data.imageType == "Harris_R") {
                                that.data.harrisImgArr_R[2] = img13;
                            } else if (that.data.imageType == "VAS_R") {
                                that.data.vasImgArr_R[2] = img13;
                            }
                            break;
                        case "21":
                            that.setData({
                                pic4: data.data.info.url
                            })
                            let img21 = {}
                            img21.pic = data.data.info.url;
                            img21.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[0] = img21;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[0] = img21;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[0] = img21;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[0] = img21;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[0] = img21;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[0] = img21;
                            }
                            break;
                        case "22":
                            that.setData({
                                pic5: data.data.info.url
                            })
                            let img22 = {}
                            img22.pic = data.data.info.url;
                            img22.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[1] = img22;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[1] = img22;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[1] = img22;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[1] = img22;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[1] = img22;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[1] = img22;
                            }
                            break;
                        case "23":
                            that.setData({
                                pic6: data.data.info.url
                            })
                            let img23 = {}
                            img23.pic = data.data.info.url;
                            img23.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[2] = img23;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[2] = img23;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[2] = img23;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[2] = img23;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[2] = img23;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[2] = img23;
                            }
                            break;
                        case "31":
                            that.setData({
                                pic7: data.data.info.url
                            })
                            let img31 = {}
                            img31.pic = data.data.info.url;
                            img31.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[3] = img31;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[3] = img31;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[3] = img31;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[3] = img31;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[3] = img31;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[3] = img31;
                            }
                            break;
                        case "32":
                            that.setData({
                                pic8: data.data.info.url
                            })
                            let img32 = {}
                            img32.pic = data.data.info.url;
                            img32.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[4] = img32;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[4] = img32;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[4] = img32;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[4] = img32;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[4] = img32;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[4] = img32;
                            }
                            break;
                        case "33":
                            that.setData({
                                pic9: data.data.info.url
                            })
                            let img33 = {}
                            img33.pic = data.data.info.url;
                            img33.picUpload = data.data.info.file;
                            if (that.data.imageType == "X-LEFT") {
                                that.data.xleftImgArr[5] = img33;
                            } else if (that.data.imageType == "CT-LEFT") {
                                that.data.ctLeftImgArr[5] = img33;
                            } else if (that.data.imageType == "MRI-LEFT") {
                                that.data.mriLeftImgArr[5] = img33;
                            } else if (that.data.imageType == "X-LEFT_R") {
                                that.data.xleftImgArr_R[5] = img33;
                            } else if (that.data.imageType == "CT-LEFT_R") {
                                that.data.ctLeftImgArr_R[5] = img33;
                            } else if (that.data.imageType == "MRI-LEFT_R") {
                                that.data.mriLeftImgArr_R[5] = img33;
                            }
                            break;
                    }
                } else {
                    that.showModal("ErrModal", data.msg);
                }
            },
            fail(res) {
                that.hideLoading();
            }
        });
    },
    onRemovePic: function(e) {
        let that = this;
        switch (e.target.dataset.le) {
            case "11":
                that.setData({
                    pic1: '',
                });
                if (that.data.imgtype == "Harris") {
                    that.data.harrisImgArr[0] = null
                } else if (that.data.imageType == "VAS") {
                    that.data.vasImgArr[0] = null
                } else if (that.data.imgtype == "Harris_R") {
                    that.data.harrisImgArr_R[0] = null
                } else if (that.data.imageType == "VAS_R") {
                    that.data.vasImgArr_R[0] = null
                }
                break;
            case "12":
                that.setData({
                    pic2: '',
                });
                if (that.data.imgtype == "Harris") {
                    that.data.harrisImgArr[1] = null
                } else if (that.data.imageType == "VAS") {
                    that.data.vasImgArr[1] = null
                } else if (that.data.imgtype == "Harris_R") {
                    that.data.harrisImgArr_R[1] = null
                } else if (that.data.imageType == "VAS_R") {
                    that.data.vasImgArr_R[1] = null
                }
                break;
            case "13":
                that.setData({
                    pic3: '',
                });
                if (that.data.imgtype == "Harris") {
                    that.data.harrisImgArr[2] = null
                } else if (that.data.imageType == "VAS") {
                    that.data.vasImgArr[2] = null
                } else if (that.data.imgtype == "Harris_R") {
                    that.data.harrisImgArr_R[2] = null
                } else if (that.data.imageType == "VAS_R") {
                    that.data.vasImgArr_R[2] = null
                }
                break;
            case "21":
                that.setData({
                    pic4: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[0] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[0] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[0] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[0] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[0] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[0] = null;
                }
                break;
            case "22":
                that.setData({
                    pic5: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[1] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[1] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[1] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[1] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[1] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[1] = null;
                }
                break;
            case "23":
                that.setData({
                    pic6: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[2] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[2] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[2] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[2] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[2] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[2] = null;
                }
                break;
            case "31":
                that.setData({
                    pic7: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[3] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[3] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[3] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[3] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[3] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[3] = null;
                }
                break;
            case "32":
                that.setData({
                    pic8: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[4] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[4] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[4] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[4] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[4] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[4] = null;
                }
                break;
            case "33":
                that.setData({
                    pic9: '',
                });
                if (that.data.imageType == "X-LEFT") {
                    that.data.xleftImgArr[5] = null;
                } else if (that.data.imageType == "CT-LEFT") {
                    that.data.ctLeftImgArr[5] = null;
                } else if (that.data.imageType == "MRI-LEFT") {
                    that.data.mriLeftImgArr[5] = null;
                } else if (that.data.imageType == "X-LEFT_R") {
                    that.data.xleftImgArr_R[5] = null;
                } else if (that.data.imageType == "CT-LEFT_R") {
                    that.data.ctLeftImgArr_R[5] = null;
                } else if (that.data.imageType == "MRI-LEFT_R") {
                    that.data.mriLeftImgArr_R[5] = null;
                }
                break;
        }
    },
    // -------- 上传图片 end  ---------- //

    onLoad: function(options) {
        this.loadProgress();
        this.setData({
            caseId: options.case_id,
            followupId: options.followupId,
            isCreateCase: options.isCreateCase,
            isLook: options.isLook ? options.isLook : false,
            szDate: options.szDate
        });
        if (!this.data.isCreateCase) {
            this.requestCaseInfo(this.data.followupId)
        }
        // else {
        //     this.setData({
        //         addAvatar: app.globalData.avatarUrl
        //     })
        // }
        this.completeProgress();
    },

    requestCaseInfo(followupId) {
        let that = this;
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Followup.GetInfo',
                followup_id: followupId,
                openid: app.globalData.openid
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.GetCaseInfo:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
                    that.initViewByData(res.data.data)
                } else {
                    that.showModal("ErrModal", res.data.msg);
                }
            },
            fail(res) {
                that.hideLoading();
            }
        });
    },
    initViewByData(info) {
        this.setData({
            followupInfo: info
        });
        // 左侧
        this.setData({
            arcoIndex: info.left.arco,
            harris: this.getDefaultNum(info.left.harris),
            harrisImgArr: this.makeImgArr(info.left.harris_pics),
            vasIndex: info.left.vas,
            vasImgArr: this.makeImgArr(info.left.vas_pics),
            xleftIndex: info.left.x_ispai,
            xleftImgArr: this.makeImgArr(info.left.x_pic),
            ctLeftIndex: info.left.ct_ispai,
            ctLeftImgArr: this.makeImgArr(info.left.ct_pic),
            mriLeftIndex: info.left.mri_ispai,
            mriLeftImgArr: this.makeImgArr(info.left.mri_pic),
            bczlIndex: info.left.bczl,
            bczlDisabled: this.getNumDisable(info.left.bczl),
            jtzl: info.left.jtzl,
            jtzlDisabled: this.getValueDisable(info.left.jtzl),
            beizhu: info.left.beizhu
        })
        // 右侧
        this.setData({
            leixingIndex_R: info.right.leixing,
            leixingDisabled_R: this.getNumDisable(info.right.leixing),
            liyou_R: info.right.liyou,
            liyouDisabled_R: this.getValueDisable(info.right.liyou),
            arcoIndex_R: info.right.arco,
            harris_R: this.getDefaultNum(info.right.harris),
            harrisImgArr_R: this.makeImgArr(info.right.harris_pics),
            vasIndex_R: info.right.vas,
            vasImgArr_R: this.makeImgArr(info.right.vas_pics),
            xleftIndex_R: info.right.x_ispai,
            xleftImgArr_R: this.makeImgArr(info.right.x_pic),
            ctLeftIndex_R: info.right.ct_ispai,
            ctLeftImgArr_R: this.makeImgArr(info.right.ct_pic),
            mriLeftIndex_R: info.right.mri_ispai,
            mriLeftImgArr_R: this.makeImgArr(info.right.mri_pic),
            bczlIndex_R: info.right.bczl,
            bczlDisabled_R: this.getNumDisable(info.right.bczl),
            jtzl_R: info.right.jtzl,
            jtzlDisabled_R: this.getValueDisable(info.right.jtzl),
            beizhu_R: info.right.beizhu
        })
    },

    makeImgArr(jsonImgArr) {
        let myImgArr = []
        if (jsonImgArr && jsonImgArr.length > 0) {
            jsonImgArr.forEach(function(item) {
                let imgObj = {}
                imgObj.pic = item;
                imgObj.picUpload = item.replace("https://onfh.think-show.com/img/", "");
                myImgArr.push(imgObj)
            })
        }

        return myImgArr;
    },

    getDefaultNum(num) {
        return num > 0 ? num : ""
    },

    getDefaultDate(date) {
        var dateValue = "请选择日期"
        if (date != null && date != 0) {
            dateValue = util.formatTime(date, 'Y-M-D')
        }
        return dateValue
    },

    getValueDisable(value) {
        return value.length <= 0
    },

    getNumDisable(value) {
        return value <= 0
    },

    // makeUpdateAvatar(avatarObjList) {
    //     var avatarList = [];
    //     var avatarLen = avatarObjList.length;
    //     for (var i = 0; i < avatarLen; i++) {
    //         avatarList[i] = avatarObjList[i].editor_avatar
    //     }
    //     return avatarList
    // },

    submit: function(e) {
        if (this.data.ShowDiagnose) { // 左侧
            this.submitLeft()
        } else if (this.data.ShowAdmission) { // 右侧
            this.submitRight()
        }
    },

    submitLeft() {
        if (!this.isLeftValueRight()) {
            return
        }

        let that = this;
        that.showLoading();

        wx.request({
            url: constant.basePath,
            data: {
                service: 'Followup.AddLeftRight',
                openid: app.globalData.openid,
                json_data: that.makeLeftData(),
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Followup.AddLeft:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
                    that.showToast("提交成功")
                    var args = {
                        currentTarget: {
                            dataset: {
                                id: 1
                            }
                        }
                    }
                    that.tabSelect(args)
                } else {
                    that.showModal("ErrModal", res.data.data.msg);
                }
            },
            fail(res) {
                that.hideLoading();
            }
        });
    },

    isLeftValueRight() {
        if (this.data.times.length == 0) {
            this.showToast("请输入随访次数")
            return false;
        }
        if (!this.data.sfDateDisabled && this.data.sfDate.length == 0) {
            this.showToast("请选择随访日期")
            return false;
        }
        if (!this.data.sfqkDisabled && this.data.sfqkIndex == 0) {
            this.showToast("请选择随访情况")
            return false;
        }
        if (!this.data.zjbcDisabled && this.data.zjbcIndex == 0) {
            this.showToast("请选择终结本侧日后随访")
            return false;
        }
        if (!this.data.sfzcDisabled && this.data.sfzcIndex == 0) {
            this.showToast("请选择是否遵从前次治疗方案")
            return false;
        }
        if (!this.data.ggfaDisabled && this.data.ggfaValue.length == 0) {
            this.showToast("请输入更改方案说明")
            return false;
        }
        if (!this.data.arcoDisabled && this.data.arcoIndex == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (!this.data.harrisDisabled && this.data.harris.length == 0) {
            this.showToast("请输入Harris评分")
            return false;
        }
        if (!this.data.vasDisabled && this.data.vasIndex == 0) {
            this.showToast("请选择VAS疼痛评分")
            return false;
        }
        if (!this.data.xleftDisabled && this.data.xleftIndex == 0) {
            this.showToast("请选择典型X光(左)")
            return false;
        }
        if (!this.data.ctLeftDisabled && this.data.ctLeftIndex == 0) {
            this.showToast("请选择典型CT(左)")
            return false;
        }
        if (!this.data.mriLeftDisabled && this.data.mriLeftIndex == 0) {
            this.showToast("请选择典型MRI(左)")
            return false;
        }
        if (!this.data.bczlDisabled && this.data.bczlIndex == 0) {
            this.showToast("请选择本次治疗方案")
            return false;
        }
        if (!this.data.jtzlDisabled && this.data.jtzl.length == 0) {
            this.showToast("请填写具体治疗措施")
            return false;
        }
        if (!this.data.beizhuDisabled && this.data.beizhu.length == 0) {
            this.showToast("请填写特殊事项备注")
            return false;
        }

        return true
    },

    makeLeftData() {
        let that = this
        var jsonData = {
            case_id: that.data.caseId,
            side: "1",
            times: that.data.times,
            // 随访日期
            sf_date: Date.parse(that.data.sfDate) / 1000,
            // 距离首诊时长
            sf_jlszsc: that.data.szscValue,
            // 随访情况
            sf_zt: that.data.sfqkIndex,
            // 终结本侧日后随访
            sf_zj: that.data.zjbcIndex,
            // 是否遵从前次治疗方案
            sf_scfa: that.data.sfzcIndex,
            // 更改方案说明
            sf_ggfa: that.data.ggfaValue,
            // arco
            arco: that.data.arcoIndex,
            // Harris
            harris: that.data.harris,
            harris_pics: that.makePicJson(that.data.harrisImgArr),
            // VAS
            vas: that.data.vasIndex,
            vas_pics: that.makePicJson(that.data.vasImgArr),
            // x-ray
            x_ispai: that.data.xleftIndex,
            x_pic: that.makePicJson(that.data.xleftImgArr),
            // CT
            ct_ispai: that.data.ctLeftIndex,
            ct_pic: that.makePicJson(that.data.ctLeftImgArr),
            // MRI
            mri_ispai: that.data.mriLeftIndex,
            mri_pic: that.makePicJson(that.data.mriLeftImgArr),
            // 本次治疗方案
            bczl: that.data.bczlIndex,
            // 具体治疗措施
            jtzl: that.data.jtzl,
            // 特殊事项备注
            beizhu: that.data.beizhu
        }
        console.log("左侧" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
    },

    makePicJson(picArr) {
        let picArrStr = '';
        if (picArr && picArr.length > 0) {
            picArr.forEach(function(item) {
                picArrStr += item.picUpload + ","
            })
        }
        return picArrStr.substr(0, picArrStr.length - 1);
    },

    getDefaultValue(value) {
        return value.length == 0 ? 0 : value
    },

    // 右侧
    submitRight() {
        if (!this.isRightValueRight()) {
            return;
        }
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Followup.AddLeftRight',
                openid: app.globalData.openid,
                json_data: that.makeRightData(),
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Followup.AddRight:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
                    that.showToast("提交成功")
                    that.reloadPrePage()
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    that.showModal("ErrModal", res.data.data.msg);
                }
            },
            fail(res) {
                that.hideLoading();
            }
        });
    },
    makeRightData() {
        let that = this
        var jsonData = {
            case_id: that.data.caseId,
            side: "2",
            times: that.data.times,
            // 随访日期
            sf_date: Date.parse(that.data.sfDate_R) / 1000,
            // 距离首诊时长
            sf_jlszsc: that.data.szscValue_R,
            // 随访情况
            sf_zt: that.data.sfqkIndex_R,
            // 终结本侧日后随访
            sf_zj: that.data.zjbcIndex_R,
            // 是否遵从前次治疗方案
            sf_scfa: that.data.sfzcIndex_R,
            // 更改方案说明
            sf_ggfa: that.data.ggfaValue_R,
            // ARCO
            arco: that.data.arcoIndex_R,
            // Harris
            harris: that.data.harris_R,
            harris_pics: that.makePicJson(that.data.harrisImgArr_R),
            // VAS
            vas: that.data.vasIndex_R,
            vas_pics: that.makePicJson(that.data.vasImgArr_R),
            // x-ray
            x_ispai: that.data.xleftIndex_R,
            x_pic: that.makePicJson(that.data.xleftImgArr_R),
            // CT
            ct_ispai: that.data.ctLeftIndex_R,
            ct_pic: that.makePicJson(that.data.ctLeftImgArr_R),
            // MRI
            mri_ispai: that.data.mriLeftIndex_R,
            mri_pic: that.makePicJson(that.data.mriLeftImgArr_R),
            // 本次治疗方案
            bczl: that.data.bczlIndex_R,
            // 具体治疗措施
            jtzl: that.data.jtzl_R,
            // 特殊事项备注
            beizhu: that.data.beizhu_R
        }
        console.log("右侧" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
    },

    isRightValueRight() {
        debugger
        if (!this.data.sfDateDisabled_R && this.data.sfDate_R.length == 0) {
            this.showToast("请选择随访日期")
            return false;
        }
        if (!this.data.sfqkDisabled_R && this.data.sfqkIndex_R == 0) {
            this.showToast("请选择随访情况")
            return false;
        }
        if (!this.data.zjbcDisabled_R && this.data.zjbcIndex_R == 0) {
            this.showToast("请选择终结本侧日后随访")
            return false;
        }
        if (!this.data.sfzcDisabled_R && this.data.sfzcIndex_R == 0) {
            this.showToast("请选择是否遵从前次治疗方案")
            return false;
        }
        if (!this.data.ggfaDisabled_R && this.data.ggfaValue_R.length == 0) {
            this.showToast("请输入更改方案说明")
            return false;
        }
        if (!this.data.arcoDisabled_R && this.data.arcoIndex_R == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (!this.data.harrisDisabled_R && this.data.harris_R.length == 0) {
            this.showToast("请输入Harris评分")
            return false;
        }
        if (!this.data.vasDisabled_R && this.data.vasIndex_R == 0) {
            this.showToast("请选择VAS疼痛评分")
            return false;
        }
        if (!this.data.xleftDisabled_R && this.data.xleftIndex_R == 0) {
            this.showToast("请选择典型X光(右)")
            return false;
        }
        if (!this.data.ctLeftDisabled_R && this.data.ctLeftIndex_R == 0) {
            this.showToast("请选择典型CT(右)")
            return false;
        }
        if (!this.data.mriLeftDisabled_R && this.data.mriLeftIndex_R == 0) {
            this.showToast("请选择典型MRI(右)")
            return false;
        }
        if (!this.data.bczlDisabled_R && this.data.bczlIndex_R == 0) {
            this.showToast("请选择本次治疗方案")
            return false;
        }
        if (!this.data.jtzlDisabled_R && this.data.jtzl_R.length == 0) {
            this.showToast("请填写具体治疗措施")
            return false;
        }
        if (!this.data.beizhuDisabled_R && this.data.beizhu_R.length == 0) {
            this.showToast("请填写特殊事项备注")
            return false;
        }

        return true;
    },

    // verify: function(e) {
    //     // if (this.data.ShowBasic) { // 基本信息
    //     //     this.verifyBasic()
    //     // } else 
    //     if (this.data.ShowDiagnose) { // 左侧
    //         this.verifyLeft()
    //     } else if (this.data.ShowAdmission) { // 右侧
    //         this.verifyRight()
    //     }
    // },

    // verifyBasic() {
    //     let that = this;
    //     that.showLoading();
    //     wx.request({
    //         url: constant.basePath,
    //         data: {
    //             service: 'Case.Approve',
    //             case_id: that.data.caseId,
    //             openid: app.globalData.openid,
    //             type: 1,
    //             state: that.data.caseInfo.base.base_state == 2 ? 2 : 1
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res) {
    //             console.log("Case.Approve:" + JSON.stringify(res))
    //             that.hideLoading();
    //             if (res.data.data.code == 0) {
    //                 that.reloadPrePage()
    //                 wx.navigateBack({
    //                     delta: 1
    //                 })
    //             } else {
    //                 that.showModal("ErrModal", res.data.data.msg);
    //             }
    //         },
    //         fail(res) {
    //             that.hideLoading();
    //         }
    //     });
    // },
    // verifyLeft() {
    //     let that = this;
    //     that.showLoading();
    //     wx.request({
    //         url: constant.basePath,
    //         data: {
    //             service: 'Case.Approve',
    //             case_id: that.data.caseId,
    //             openid: app.globalData.openid,
    //             type: 2,
    //             state: that.data.caseInfo.left.state == 2 ? 2 : 1
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res) {
    //             that.hideLoading();
    //             if (res.data.data.code == 0) {
    //                 that.reloadPrePage()
    //                 wx.navigateBack({
    //                     delta: 1
    //                 })
    //             } else {
    //                 that.showModal("ErrModal", res.data.data.msg);
    //             }
    //         },
    //         fail(res) {
    //             that.hideLoading();
    //         }
    //     });
    // },
    // verifyRight() {
    //     let that = this;
    //     that.showLoading();
    //     wx.request({
    //         url: constant.basePath,
    //         data: {
    //             service: 'Case.Approve',
    //             case_id: that.data.caseId,
    //             openid: app.globalData.openid,
    //             type: 3,
    //             state: that.data.caseInfo.right.state == 2 ? 2 : 1
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res) {
    //             that.hideLoading();
    //             if (res.data.data.code == 0) {
    //                 that.reloadPrePage()
    //                 wx.navigateBack({
    //                     delta: 1
    //                 })
    //             } else {
    //                 that.showModal("ErrModal", res.data.data.msg);
    //             }
    //         },
    //         fail(res) {
    //             that.hideLoading();
    //         }
    //     });
    // },

    reloadPrePage() {
        var pages = getCurrentPages();
        if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.initData()
        }
    },

    // onUnload() {
    //     if (this.data.isLook) {
    //         return
    //     }
    //     let that = this;
    //     that.showLoading();
    //     wx.request({
    //         url: constant.basePath,
    //         data: {
    //             service: 'Case.ClearWritingStatus',
    //             case_id: that.data.caseId,
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res) {
    //             that.hideLoading();
    //             if (res.data.data.code == 0) {
    //                 // that.reloadPrePage()
    //                 // wx.navigateBack({
    //                 //     delta: 1
    //                 // })
    //             } else {
    //                 that.showModal("ErrModal", res.data.data.msg);
    //             }
    //         },
    //         fail(res) {
    //             that.hideLoading();
    //         }
    //     });
    // }
});