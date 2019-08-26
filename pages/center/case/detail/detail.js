'use strict';

let constant = require('../../../../utils/constant.js');
let util = require('../../../../utils/util.js');

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
        TabTitle: ['基本信息', '左侧', '右侧'],
        ShowBasic: true,
        ShowDiagnose: false,
        ShowAdmission: false,
        // -------- tab切换 end -------- //

        // -------- 公用信息 begin -------- //
        centerId: '',
        centerName: '',
        caseId: '',
        isCreateCase: '',
        isLook: false,
        caseInfo: {},
        addAvatar: '',
        updateAvatarArr: [],
        approveAvatar: '',
        // -------- 公用信息 end -------- //

        // -------- 基本信息 begin -------- //
        name: '',
        caseNO: "",
        createDate: util.getNowFormatDate(new Date()),
        sex: 0,
        sexPicker: ['请选择', '男', '女'],
        age: '',
        height: '',
        weight: '',
        bmi: '',
        chiefDoc: '',
        tel1: '',
        tel2: '',
        tel2Disabled: false,
        qtbsjb: '',
        jybs: '',
        isBaseLock: 0,
        // -------- 基本信息 end -------- //

        // -------- 左侧 begin -------- //
        // 症状出现时长
        symptomDateMultiArray: [
            ['单位'],
            ['天', '周', '月', '年'],
            (() => {
                let temp = ['请选择'];
                for (let i = 1; i <= 250; i++) {
                    temp.push(i + '')
                }
                return temp
            })(),
        ],
        symptomDateMultiIndex: [0, 0, 0],
        symptomDateValue: '请选择',
        symptomDisabled: false,
        // 首诊治疗
        sszlIndex: 0,
        sszlPicker: ["未治疗", "药物治疗", "钻孔减压", "腓骨移植", "其他"],
        sszlDisabled: false,
        // 类型
        leixingIndex: 0,
        leixingPicker: ["请选择", "激素型", "酒精性", "创伤性", "特发性", "其他"],
        leixingDisabled: false,
        // 理由
        liyou: '',
        liyouDisabled: false,
        // ARCO
        arcoIndex: 0,
        arcoPicker: ["请选择", "ARCO I期", "ARCO II期", "ARCO III期", "ARCO IV期", "未发病"],
        // harris
        harris: '',
        harrisImgArr: [],
        // VAS
        vasIndex: 0,
        vasPicker: ["请选择", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        vasImgArr: [],
        // x光左
        xleftIndex: 0,
        xleftPicker: ["请选择", "已拍", "未拍"],
        xleftImgArr: [],
        // CT左
        ctLeftIndex: 0,
        ctLeftPicker: ["请选择", "已拍", "未拍"],
        ctLeftImgArr: [],
        // MRI左
        mriLeftIndex: 0,
        mriLeftPicker: ["请选择", "已拍", "未拍"],
        mriLeftImgArr: [],
        // 本次治疗方法
        bczlIndex: 0,
        bczlPicker: ["请选择", "无治疗", "药物治疗", "钻孔减压", "手术", "其他"],
        bczlDisabled: false,
        // 具体治疗措施
        jtzl: '',
        jtzlDisabled: false,
        beizhu: '',

        // -------- 左侧 end -------- //

        // -------- 右侧 begin -------- //
        symptomDateMultiArray_R: [
            ['单位'],
            ['天', '周', '月', '年'],
            (() => {
                let temp = ['请选择'];
                for (let i = 1; i <= 250; i++) {
                    temp.push(i + '')
                }
                return temp
            })(),
        ],
        symptomDateMultiIndex_R: [0, 0, 0],
        symptomDateValue_R: '请选择',
        symptomDisabled_R: false,
        // 首诊治疗
        sszlIndex_R: 0,
        sszlPicker_R: ["未治疗", "药物治疗", "钻孔减压", "腓骨移植", "其他"],
        sszlDisabled_R: false,
        // 类型
        leixingIndex_R: 0,
        leixingPicker_R: ["请选择", "激素型", "酒精性", "创伤性", "特发性", "其他"],
        leixingDisabled_R: false,
        // 理由
        liyou_R: '',
        liyouDisabled_R: false,
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
        beizhu_R: '',

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
                    ShowBasic: true,
                    ShowDiagnose: false,
                    ShowAdmission: false,
                });
                if (!this.data.isCreateCase) {
                    this.setData({
                        addAvatar: this.data.caseInfo.base.base_creator_avatar,
                        updateAvatarArr: this.makeUpdateAvatar(this.data.caseInfo.base.base_editor_list),
                        approveAvatar: this.data.caseInfo.base.base_auditor_avatar,
                    })
                }
                break;
            case 1:
                this.setData({
                    TabCur: tabId,
                    VerticalNavTop: (tabId - 1) * 50,
                    ShowBasic: false,
                    ShowDiagnose: true,
                    ShowAdmission: false,
                });
                if (!this.data.isCreateCase) {
                    this.setData({
                        addAvatar: this.data.caseInfo.puncture.puncture_creator_avatar,
                        updateAvatarArr: this.makeUpdateAvatar(this.data.caseInfo.puncture.puncture_editor_list),
                        approveAvatar: this.data.caseInfo.puncture.puncture_auditor_avatar,
                    })
                }
                break;
            case 2:
                this.setData({
                    TabCur: tabId,
                    VerticalNavTop: (tabId - 1) * 50,
                    ShowBasic: false,
                    ShowDiagnose: false,
                    ShowAdmission: true,
                });
                if (!this.data.isCreateCase) {
                    this.setData({
                        addAvatar: this.data.caseInfo.bein.bein_creator_avatar,
                        updateAvatarArr: this.makeUpdateAvatar(this.data.caseInfo.bein.bein_editor_list),
                        approveAvatar: this.data.caseInfo.bein.bein_auditor_avatar,
                    })
                }
                break;
        }
    },

    // -------- 基本信息事件 begin -------- //
    onNameInput: function(e) {
        this.setData({
            name: e.detail.value
        });
    },
    onCaseNOInput: function(e) {
        this.setData({
            caseNO: e.detail.value
        });
    },
    onCreateDateChange: function(e) {
        this.setData({
            createDate: e.detail.value
        });
    },
    onSexChange: function(e) {
        this.setData({
            sex: parseInt(e.detail.value)
        });
    },
    onAgeInput: function(e) {
        this.setData({
            age: e.detail.value,
        });
    },
    onHeightInput: function(e) {
        this.setData({
            height: e.detail.value
        });
        if (this.data.weight != 0 && this.data.height != 0) {
            var calcBMI = this.data.weight / (this.data.height * this.data.height)
            this.setData({
                bmi: calcBMI.toFixed(2)
            })
        }
    },
    onWeightInput: function(e) {
        this.setData({
            weight: e.detail.value
        });
        if (this.data.weight != 0 && this.data.height != 0) {
            var calcBMI = this.data.weight / (this.data.height * this.data.height)
            this.setData({
                bmi: calcBMI.toFixed(2)
            })
        }
    },
    onChiefDocInput: function(e) {
        this.setData({
            chiefDoc: e.detail.value
        });
    },
    onTel1Input: function(e) {
        this.setData({
            tel1: e.detail.value
        });
    },
    onTel2Input: function(e) {
        this.setData({
            tel2: e.detail.value
        });
    },
    onTel2SwitchChange: function(e) {
        this.setData({
            tel2Disabled: !e.detail.value
        });
        if (this.data.tel2Disabled) {
            this.setData({
                tel2: ''
            });
        }
    },
    onQtbsjbInput: function(e) {
        this.setData({
            qtbsjb: e.detail.value
        });
    },
    onJybsInput: function(e) {
        this.setData({
            jybs: e.detail.value
        });
    },
    // -------- 基本信息事件 end -------- //

    // -------- 左侧 begin -------- //
    defaultSymptomDate: function() {
        let data = {
            symptomDateMultiArray: this.data.symptomDateMultiArray,
            symptomDateMultiIndex: this.data.symptomDateMultiIndex
        };
        switch (data.symptomDateMultiIndex[1]) {
            case 0:
                data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 1:
                data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 2:
                data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 3:
                data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
        }
        this.setData(data);
        return data.symptomDateMultiArray;
    },
    symptomDateChange: function(e) {
        this.setData({
            symptomDateMultiIndex: e.detail.value,
            symptomDateValue: '' + e.detail.value[2] + this.data.symptomDateMultiArray[1][e.detail.value[1]]
        });
    },
    symptomDateColumnChange: function(e) {
        let data = {
            symptomDateMultiArray: this.data.symptomDateMultiArray,
            symptomDateMultiIndex: this.data.symptomDateMultiIndex
        };
        data.symptomDateMultiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.symptomDateMultiIndex[0]) {
                    case 0:
                        data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 1:
                        data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 2:
                        data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 3:
                        data.symptomDateMultiArray[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                }
                data.symptomDateMultiIndex[1] = 0;
                data.symptomDateMultiIndex[2] = 0;
                break;
            case 1:
                switch (data.symptomDateMultiIndex[0]) {
                    case 0:
                        switch (data.symptomDateMultiIndex[1]) {
                            case 0:
                                data.symptomDateMultiArray[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 1:
                                data.symptomDateMultiArray[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 2:
                                data.symptomDateMultiArray[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 3:
                                data.symptomDateMultiArray[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                        }
                        break;
                }
                data.symptomDateMultiIndex[2] = 0;
                break;
        }
        if (data.symptomDateMultiIndex[1] == 0 && data.symptomDateMultiIndex[2] < 31 || data.symptomDateMultiIndex[1] == 1 && data.symptomDateMultiIndex[2] < 3) {
            // <= 21天 或者 <= 3周是急性
            this.setData({
                xingzhiIndex: 1,
                xingzhiValue: '急性'
            })
        } else {
            this.setData({
                xingzhiIndex: 2,
                xingzhiValue: '慢性'
            })
        }
        this.setData(data);
    },
    onSymptomSwitchChange: function(e) {
        this.setData({
            symptomDisabled: !e.detail.value
        });
        if (this.data.symptomDisabled) {
            this.setData({
                symptomDateValue: ""
            })
        }
    },
    onSzzlChange: function(e) {
        this.setData({
            szzlIndex: e.detail.value,
        });
    },
    onSzzlSwitchChange: function(e) {
        this.setData({
            sszlDisabled: !e.detail.value
        });
        if (this.data.sszlDisabled) {
            this.setData({
                sszlIndex: 0
            });
        }
    },
    onLeixingChange: function(e) {
        this.setData({
            leixingIndex: e.detail.value,
        });
    },
    onLeixingSwitchChange: function(e) {
        this.setData({
            leixingDisabled: !e.detail.value
        });
        if (this.data.leixingDisabled) {
            this.setData({
                leixingIndex: 0
            });
        }
    },
    onLiyouInput: function(e) {
        this.setData({
            liyou: e.detail.value
        });
    },
    onLiyouSwitchChange: function(e) {
        this.setData({
            liyouDisabled: !e.detail.value
        });
        if (this.data.liyouDisabled) {
            this.setData({
                liyou: ''
            });
        }
    },
    onArcoChange: function(e) {
        this.setData({
            arcoIndex: e.detail.value,
        });
    },
    onHarrisInput: function(e) {
        this.setData({
            harris: e.detail.value
        });
    },
    onVASChange: function(e) {
        this.setData({
            vasIndex: e.detail.value,
        });
    },
    onXLeftChange: function(e) {
        this.setData({
            xleftIndex: e.detail.value,
        });
    },
    onCTLeftChange: function(e) {
        this.setData({
            ctLeftIndex: e.detail.value,
        });
    },
    onMRILeftChange: function(e) {
        this.setData({
            mriLeftIndex: e.detail.value,
        });
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
    // -------- 左侧 end -------- //

    // -------- 右侧 begin -------- //
    defaultSymptomDate_R: function() {
        let data = {
            symptomDateMultiArray_R: this.data.symptomDateMultiArray_R,
            symptomDateMultiIndex_R: this.data.symptomDateMultiIndex_R
        };
        switch (data.symptomDateMultiIndex_R[1]) {
            case 0:
                data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray_R[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 1:
                data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray_R[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 2:
                data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray_R[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
            case 3:
                data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                data.symptomDateMultiArray_R[2] = (() => {
                    let temp = ['请选择'];
                    for (let i = 1; i <= 250; i++) {
                        temp.push(i + '')
                    }
                    return temp
                })();
                break;
        }
        this.setData(data);
        return data.symptomDateMultiArray_R;
    },
    symptomDateChange_R: function(e) {
        this.setData({
            symptomDateMultiIndex_R: e.detail.value,
            symptomDateValue_R: '' + e.detail.value[2] + this.data.symptomDateMultiArray_R[1][e.detail.value[1]]
        });
    },
    symptomDateColumnChange_R: function(e) {
        let data = {
            symptomDateMultiArray_R: this.data.symptomDateMultiArray_R,
            symptomDateMultiIndex_R: this.data.symptomDateMultiIndex_R
        };
        data.symptomDateMultiIndex_R[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.symptomDateMultiIndex_R[0]) {
                    case 0:
                        data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray_R[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 1:
                        data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray_R[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 2:
                        data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray_R[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                    case 3:
                        data.symptomDateMultiArray_R[1] = ['天', '周', '月', '年'];
                        data.symptomDateMultiArray_R[2] = (() => {
                            let temp = ['请选择'];
                            for (let i = 1; i <= 250; i++) {
                                temp.push(i + '')
                            }
                            return temp
                        })();
                        break;
                }
                data.symptomDateMultiIndex_R[1] = 0;
                data.symptomDateMultiIndex_R[2] = 0;
                break;
            case 1:
                switch (data.symptomDateMultiIndex_R[0]) {
                    case 0:
                        switch (data.symptomDateMultiIndex_R[1]) {
                            case 0:
                                data.symptomDateMultiArray_R[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 1:
                                data.symptomDateMultiArray_R[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 2:
                                data.symptomDateMultiArray_R[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                            case 3:
                                data.symptomDateMultiArray_R[2] = (() => {
                                    let temp = ['请选择'];
                                    for (let i = 1; i <= 250; i++) {
                                        temp.push(i + '')
                                    }
                                    return temp
                                })();
                                break;
                        }
                        break;
                }
                data.symptomDateMultiIndex_R[2] = 0;
                break;
        }

        this.setData(data);
    },
    onSymptomSwitchChange_R: function(e) {
        this.setData({
            symptomDisabled_R: !e.detail.value
        });
        if (this.data.symptomDisabled_R) {
            this.setData({
                symptomDateValue_R: ""
            })
        }
    },
    onSzzlChange_R: function(e) {
        this.setData({
            sszlIndex_R: e.detail.value,
        });
    },
    onSzzlSwitchChange_R: function(e) {
        this.setData({
            sszlDisabled_R: !e.detail.value
        });
        if (this.data.sszlDisabled_R) {
            this.setData({
                sszlIndex_R: 0
            });
        }
    },
    onLeixingChange_R: function(e) {
        this.setData({
            leixingIndex_R: e.detail.value,
        });
    },
    onLeixingSwitchChange_R: function(e) {
        this.setData({
            leixingDisabled_R: !e.detail.value
        });
        if (this.data.leixingDisabled_R) {
            this.setData({
                leixingIndex_R: 0
            });
        }
    },
    onLiyouInput_R: function(e) {
        this.setData({
            liyou_R: e.detail.value
        });
    },
    onLiyouSwitchChange_R: function(e) {
        this.setData({
            liyouDisabled_R: !e.detail.value
        });
        if (this.data.liyouDisabled_R) {
            this.setData({
                liyou_R: ''
            });
        }
    },
    onArcoChange_R: function(e) {
        this.setData({
            arcoIndex_R: e.detail.value,
        });
    },
    onHarrisInput_R: function(e) {
        this.setData({
            harris_R: e.detail.value
        });
    },
    onVASChange_R: function(e) {
        this.setData({
            vasIndex_R: e.detail.value,
        });
    },
    onXLeftChange_R: function(e) {
        this.setData({
            xleftIndex_R: e.detail.value,
        });
    },
    onCTLeftChange_R: function(e) {
        this.setData({
            ctLeftIndex_R: e.detail.value,
        });
    },
    onMRILeftChange_R: function(e) {
        this.setData({
            mriLeftIndex_R: e.detail.value,
        });
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
                                pic1: data.data.info.url
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
        var caseId = options.case_id;
        this.setData({
            centerId: options.centerId ? options.centerId : '',
            centerName: options.centerName ? options.centerName : '',
            isAdmin: app.globalData.is_admin == '1',
            caseId: caseId,
            isCreateCase: caseId.length <= 0,
            isLook: options.isLook ? options.isLook : false
        });
        if (!this.data.isCreateCase) {
            this.requestCaseInfo(caseId)
        } else {
            this.setData({
                addAvatar: app.globalData.avatarUrl
            })
        }
        this.completeProgress();
    },

    requestCaseInfo(caseId) {
        let that = this;
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.GetCaseInfo',
                case_id: caseId,
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
            caseInfo: info
        });
        // 基本信息
        let tempSymptomsUnit = [0, parseInt(info.base.duration_symptoms_unit), parseInt(info.base.duration_symptoms)];
        this.setData({
            name: info.base.patient_name,
            caseNO: info.base.case_no,
            createDate: util.formatTime(info.base.create_time, 'Y-M-D'),
            sex: info.base.sex,
            age: info.base.age,
            height: info.base.height,
            weight: info.base.weight,
            bmi: info.base.bmi,
            chiefDoc: info.base.pro_doctor,
            tel1: info.base.telphone1,
            tel2: info.base.telphone2,
            tel2Disabled: this.getValueDisable(info.base.telphone2),
            qtbsjb: info.base.other_concomitant_diseases,
            jybs: info.base.medical_history,
            addAvatar: info.base.base_creator_avatar,
            updateAvatarArr: this.makeUpdateAvatar(info.base.base_editor_list),
            approveAvatar: info.base.base_auditor_avatar,
            isBaseLock: info.base.is_lock
        })
        // 左侧
        this.setData({
            symptomDateMultiIndex: tempSymptomsUnit,
            symptomDateValue: tempSymptomsUnit[2] ? '' + tempSymptomsUnit[2] + this.data.symptomDateMultiArray[1][tempSymptomsUnit[1]] : '请选择',
            // zzclIndex = data.zzcl,
            // zzclDisabled = this.getNumDisable(data.zzcl),
            // harris = this.getDefaultNum(data.harris),
            // liyou = data.liyou,
            // liyouDisabled = this.getValueDisable(data.liyou)
        })
        // 右侧
        this.setData({

        })
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

    makeUpdateAvatar(avatarObjList) {
        var avatarList = [];
        var avatarLen = avatarObjList.length;
        for (var i = 0; i < avatarLen; i++) {
            if (avatarObjList[i].base_editor_avatar) {
                avatarList[i] = avatarObjList[i].base_editor_avatar
            } else if (avatarObjList[i].puncture_editor_avatar) {
                avatarList[i] = avatarObjList[i].puncture_editor_avatar
            } else if (avatarObjList[i].bein_editor_avatar) {
                avatarList[i] = avatarObjList[i].bein_editor_avatar
            }
        }
        return avatarList
    },

    submit: function(e) {
        if (this.data.ShowBasic) { // 基本信息
            this.submitBasic()
        } else if (this.data.ShowDiagnose) { // 左侧
            this.submitLeft()
        } else if (this.data.ShowAdmission) { // 右侧
            this.submitRight()
        }
    },

    submitBasic() {
        if (!this.isBasicValueRight()) {
            return;
        }

        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.CreateEditCaseBase',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                json_data: that.makeBasicData()
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.CreateEditCaseBase:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
                    that.setData({
                        caseId: res.data.data.info.case_id
                    })
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

    isBasicValueRight() {
        if (this.data.name.length <= 0) {
            this.showToast("请填写姓名")
            return false;
        }
        if (this.data.caseNO.length <= 0) {
            this.showToast("请填写病历号")
            return false;
        }
        if (this.data.sex == 0) {
            this.showToast("请选择性别")
            return false;
        }
        if (this.data.age.length <= 0) {
            this.showToast("请填写年龄")
            return false;
        }
        if (this.data.height.length <= 0) {
            this.showToast("请填写身高")
            return false;
        }
        if (this.data.weight.length <= 0) {
            this.showToast("请填写体重")
            return false;
        }
        if (this.data.chiefDoc.length <= 0) {
            this.showToast("请填写主诊医师")
            return false;
        }
        if (this.data.tel1.length <= 0) {
            this.showToast("请填写联系电话1")
            return false;
        }
        if (!this.data.tel2Disabled && this.data.tel2.length == 0) {
            this.showToast("请填写联系电话2")
            return false;
        }
        if (this.data.qtbsjb.length <= 0) {
            this.showToast("请填写其他伴随疾病")
            return false;
        }
        if (this.data.jybs.length <= 0) {
            this.showToast("请填写简要病史")
            return false;
        }

        return true;
    },

    makeBasicData() {
        let that = this;
        var jsonData = {
            center_id: that.data.centerId,
            patient_name: that.data.name,
            case_no: that.data.caseNO,
            create_time: new Date(that.data.createDate).getTime() / 1000,
            sex: that.data.sex,
            age: parseInt(that.data.age),
            height: parseFloat(that.data.height),
            weight: parseFloat(that.data.weight),
            bmi: parseFloat(that.data.bmi),
            pro_doctor: that.data.chiefDoc,
            telphone1: that.data.tel1,
            telphone2: that.data.tel2,

            other_concomitant_diseases: that.data.qtbsjb,
            medical_history: that.data.jybs,
        }
        console.log("基本信息：" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
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
                service: 'Case.CreateEditLeftRight',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                json_data: that.makeLeftData(),
                side: "1"
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.CreateEditLeftRight:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
                    that.showToast("提交成功")
                    var args = {
                        currentTarget: {
                            dataset: {
                                id: 2
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
        if (!this.data.symptomDisabled && this.data.symptomDateValue == '请选择') {
            this.showToast("请选择症状出现时长")
            return false;
        }
        // if (!this.data.sszlDisabled && this.data.sszlIndex == 0) {
        //     this.showToast("请选择首诊治疗情况")
        //     return false;
        // }
        if (!this.data.leixingDisabled && this.data.leixingIndex == 0) {
            this.showToast("请选择类型")
            return false;
        }
        if (!this.data.liyouDisabled && this.data.liyou.length == 0) {
            this.showToast("请填写理由")
            return false;
        }
        if (this.data.arcoIndex == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (this.data.arcoIndex == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (this.data.harris.length == 0) {
            this.showToast("请输入Harris评分")
            return false;
        }
        if (this.data.vasIndex == 0) {
            this.showToast("请选择VAS疼痛评分")
            return false;
        }
        if (this.data.xleftIndex == 0) {
            this.showToast("请选择典型X光(左)")
            return false;
        }
        if (this.data.ctLeftIndex == 0) {
            this.showToast("请选择典型CT(左)")
            return false;
        }
        if (this.data.mriLeftIndex == 0) {
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
        if (this.data.beizhu.length == 0) {
            this.showToast("请填写特殊事项备注")
            return false;
        }

        return true
    },

    makeLeftData() {
        let that = this
        var jsonData = {
            case_id: that.data.caseId,
            type: "1",
            // 症状出现时长
            duration_symptoms: parseInt(that.data.symptomDateMultiIndex[2]),
            // 症状出现时长单位。1天，2月(必填项)
            duration_symptoms_unit: parseInt(that.data.symptomDateMultiIndex[1]),
            // 首诊前治疗情况
            sszl: parseInt(that.data.sszlIndex) + 1,
            // 类型
            leixing: that.data.leixingIndex,
            // 理由
            liyou: that.data.liyou,
            // ARCO
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
            mri_ispai: that.datt.mriLeftIndex,
            mri_pic: that.makePicJson(that.data.mriLeftImgArr),
            // 本次治疗方案
            bczl: that.data.bczlIndex,
            // 具体治疗措施
            jtzl: that.data.jtzl
            // le_testpaper_stoste: parseInt(this.getDefaultValue(that.data.leIndex)),
            // le_testpaper_pic: JSON.stringify(lePic),
            // le_testpaper_centrifugal: parseInt(this.getDefaultValue(that.data.leAfterIndex)),
            // le_testpaper_centr_pic: JSON.stringify(leCentrPic),
            // joint_fluid_leukocyte: parseInt(this.getDefaultValue(that.data.gjybxb)),
            // neutrophils_percent: parseFloat(this.getDefaultValue(that.data.gjyzx)),

        }
        console.log("左侧" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
    },

    makePicJson(picArr) {
        let picArrStr;
        if (picArr && picArr.length > 0) {
            picArr.forEach(function(item) {
                picArrStr += item.pic + ","
            })
        }

        return picArrStr;
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
                service: 'Case.CreateEditLeftRight',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                json_data: that.makeRightData(),
                side: "2"
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.CreateEditLeftRight:" + JSON.stringify(res))
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
            type: "2",
            // 症状出现时长
            duration_symptoms: parseInt(that.data.symptomDateMultiIndex_R[2]),
            // 症状出现时长单位。1天，2月(必填项)
            duration_symptoms_unit: parseInt(that.data.symptomDateMultiIndex_R[1]),
            // 首诊前治疗情况
            sszl: parseInt(that.data.sszlIndex_R) + 1,
            // 类型
            leixing: that.data.leixingIndex_R,
            // 理由
            liyou: that.data.liyou_R,
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
            mri_ispai: that.datt.mriLeftIndex_R,
            mri_pic: that.makePicJson(that.data.mriLeftImgArr_R),
            // 本次治疗方案
            bczl: that.data.bczlIndex_R,
            // 具体治疗措施
            jtzl: that.data.jtzl_R
        }
        console.log("右侧" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
    },

    isRightValueRight() {
        if (!this.data.symptomDisabled_R && this.data.symptomDateValue_R == '请选择') {
            this.showToast("请选择症状出现时长")
            return false;
        }
        // if (!this.data.sszlDisabled_R && this.data.sszlIndex_R == 0) {
        //     this.showToast("请选择首诊治疗情况")
        //     return false;
        // }
        if (!this.data.leixingDisabled_R && this.data.leixingIndex_R == 0) {
            this.showToast("请选择类型")
            return false;
        }
        if (!this.data.liyouDisabled_R && this.data.liyou_R.length == 0) {
            this.showToast("请填写理由")
            return false;
        }
        if (this.data.arcoIndex_R == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (this.data.arcoIndex_R == 0) {
            this.showToast("请选择ARCO分期")
            return false;
        }
        if (this.data.harris_R.length == 0) {
            this.showToast("请输入Harris评分")
            return false;
        }
        if (this.data.vasIndex_R == 0) {
            this.showToast("请选择VAS疼痛评分")
            return false;
        }
        if (this.data.xleftIndex_R == 0) {
            this.showToast("请选择典型X光(左)")
            return false;
        }
        if (this.data.ctLeftIndex_R == 0) {
            this.showToast("请选择典型CT(左)")
            return false;
        }
        if (this.data.mriLeftIndex_R == 0) {
            this.showToast("请选择典型MRI(左)")
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
        if (this.data.beizhu_R.length == 0) {
            this.showToast("请填写特殊事项备注")
            return false;
        }

        return true;
    },

    verify: function(e) {
        if (this.data.ShowBasic) { // 基本信息
            this.verifyBasic()
        } else if (this.data.ShowDiagnose) { // 左侧
            this.verifyLeft()
        } else if (this.data.ShowAdmission) { // 右侧
            this.verifyRight()
        }
    },

    verifyBasic() {
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.Approve',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                type: 1,
                state: that.data.caseInfo.base.base_state == 2 ? 2 : 1
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.Approve:" + JSON.stringify(res))
                that.hideLoading();
                if (res.data.data.code == 0) {
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
    verifyLeft() {
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.Approve',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                type: 2,
                state: that.data.caseInfo.puncture.puncture_state == 2 ? 2 : 1
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.hideLoading();
                if (res.data.data.code == 0) {
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
    verifyRight() {
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.Approve',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                type: 3,
                state: that.data.caseInfo.bein.bein_state == 2 ? 2 : 1
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.hideLoading();
                if (res.data.data.code == 0) {
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

    reloadPrePage() {
        var pages = getCurrentPages();
        if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.initData()
        }
    },

    onUnload() {
        if (this.data.isLook) {
            return
        }
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.ClearWritingStatus',
                case_id: that.data.caseId,
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.hideLoading();
                if (res.data.data.code == 0) {
                    // that.reloadPrePage()
                    // wx.navigateBack({
                    //     delta: 1
                    // })
                } else {
                    that.showModal("ErrModal", res.data.data.msg);
                }
            },
            fail(res) {
                that.hideLoading();
            }
        });
    }
});