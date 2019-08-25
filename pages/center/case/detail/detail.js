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
        tel2Disabled: true,
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

        // -------- 左侧 end -------- //

        // -------- 右侧 begin -------- //
        doudaoIndex: 0,
        doudaoPicker: ["请选择", "有", "无"],
        sqesr: '',
        sqcrp: '',
        bzhcrp: '',
        il6: '',
        il6Disabled: true,
        xwdby: '',
        xwdbyDisabled: true,
        ddimer: '',
        ddimerDisabled: true,
        shoushuDate: '请选择日期',
        ssDateDisabled: true,
        szjnIndex: 0,
        szjnPicker: ["请选择", "脓性液体", "未见脓液"],
        szjnDisabled: true,
        blIndex: 0,
        blPicker: ["请选择", "<5", "5-10", ">10"],
        blDisabled: true,
        szLEIndex: 0,
        szLEPicker: ["请选择", "无法判定", "neg.", "25", "75", "250(+)", "500(+)"],
        szLEDisabled: true,
        szLEAfterIndex: 0,
        szLEAfterPicker: ["请选择", "无法判定", "neg.", "25", "75", "250(+)", "500(+)"],
        szLEAfterDisabled: true,
        szgjybxb: '',
        szgjybxbDisabled: true,
        szgjyzxl: '',
        szgjyzxlDisabled: true,
        szzz1: '',
        szzz1Disabled: true,
        szzz2: '',
        szzz2Disabled: true,
        szzz3: '',
        szzz3Disabled: true,
        szzz4: '',
        szzz4Disabled: true,
        szzz5: '',
        szzz5Disabled: true,
        szxy: '',
        szxyDisabled: true,
        szyy: '',
        szyyDisabled: true,
        szgjymNGS: '',
        szgjymNGSDisabled: true,
        szzzmNGS: '',
        szzzmNGSDisabled: true,
        csljymNGS: '',
        csljymNGSDisabled: true,
        zznMGSResult: '',
        zznMGSResultDisabled: true,
        csljy: '',
        csljyDisabled: true,
        msisIndex: 0,
        msisPicker: ["请选择", "暂不能确定", "感染", "非感染"],
        msisDisabled: true,
        zzclIndex: 0,
        zzclPicker: ["请选择", "失访-不详", "未手术-门诊随访", "未手术-抗生素压制", "手术-清创换垫", "手术-关节融合", "手术-截肢", "未手术-抗生素压制", "手术-假体植入", "手术-占位器植入"],
        zzclDisabled: true,
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
    // -------- 左侧 end -------- //

    // -------- 右侧 begin -------- //
    onDoudaoChange: function(e) {
        this.setData({
            doudaoIndex: e.detail.value,
        });
    },
    onSqesrChange: function(e) {
        this.setData({
            sqesr: e.detail.value,
        });
    },
    onSqcrpChange: function(e) {
        this.setData({
            sqcrp: e.detail.value,
            bzhcrp: e.detail.value * 10
        });
    },
    onIl6Change: function(e) {
        this.setData({
            il6: e.detail.value
        });
    },
    onIl6SwitchChange: function(e) {
        this.setData({
            il6Disabled: !e.detail.value
        });
        if (this.data.il6Disabled) {
            this.setData({
                il6: ''
            })
        }
    },
    onXwdbyChange: function(e) {
        this.setData({
            xwdby: e.detail.value
        });
    },
    onXwdbySwitchChange: function(e) {
        this.setData({
            xwdbyDisabled: !e.detail.value
        });
        if (this.data.xwdbyDisabled) {
            this.setData({
                xwdby: ''
            })
        }
    },
    onDdimerChange: function(e) {
        this.setData({
            ddimer: e.detail.value
        });
    },
    onDdimerSwitchChange: function(e) {
        this.setData({
            ddimerDisabled: !e.detail.value
        });
        if (this.data.ddimerDisabled) {
            this.setData({
                ddimer: ''
            })
        }
    },
    onShoushuDateChange: function(e) {
        this.setData({
            shoushuDate: e.detail.value
        });
    },
    onShoushuSwitchChange: function(e) {
        this.setData({
            ssDateDisabled: !e.detail.value
        });
        if (this.data.ssDateDisabled) {
            this.setData({
                shoushuDate: '请选择日期'
            })
        }
    },
    onSzjnChange: function(e) {
        this.setData({
            szjnIndex: e.detail.value,
        });
    },
    onSzjnSwitchChange: function(e) {
        this.setData({
            szjnDisabled: !e.detail.value
        });
        if (this.data.szjnDisabled) {
            this.setData({
                szjnIndex: 0
            })
        }
    },
    onBlChange: function(e) {
        this.setData({
            blIndex: e.detail.value,
        });
    },
    onBlSwitchChange: function(e) {
        this.setData({
            blDisabled: !e.detail.value
        });
        if (this.data.blDisabled) {
            this.setData({
                blIndex: 0
            })
        }
    },
    onSZLEChange: function(e) {
        this.setData({
            szLEIndex: e.detail.value,
        });
    },
    onSZLESwitchChange: function(e) {
        this.setData({
            szLEDisabled: !e.detail.value
        });
        if (this.data.szLEDisabled) {
            this.setData({
                szLEIndex: 0,
            })
        }
    },
    onSZLEAfterChange: function(e) {
        this.setData({
            szLEAfterIndex: e.detail.value,
        });
    },
    onSZLEAfterSwitchChange: function(e) {
        this.setData({
            szLEAfterDisabled: !e.detail.value
        });
        if (this.data.szLEAfterDisabled) {
            this.setData({
                szLEAfterIndex: 0,
                pic10: '',
                pic10Upload: '',
                pic11: '',
                pic11Upload: '',
                pic12: '',
                pic12Upload: ''
            })
        }
    },
    onSzgjybxbInput: function(e) {
        this.setData({
            szgjybxb: e.detail.value
        });
    },
    onSzgjybxbSwitchChange: function(e) {
        this.setData({
            szgjybxbDisabled: !e.detail.value
        });
        if (this.data.szgjybxbDisabled) {
            this.setData({
                szgjybxb: ""
            })
        }
    },
    onSzgjyzxlInput: function(e) {
        this.setData({
            szgjyzxl: e.detail.value
        });

    },
    onSzgjyzxlSwitchChange: function(e) {
        this.setData({
            szgjyzxlDisabled: !e.detail.value
        });
        if (this.data.szgjyzxlDisabled) {
            this.setData({
                szgjyzxl: ""
            })
        }
    },
    onSzzz1Input: function(e) {
        this.setData({
            szzz1: e.detail.value
        });
    },
    onSzzz1SwitchChange: function(e) {
        this.setData({
            szzz1Disabled: !e.detail.value
        });
        if (this.data.szzz1Disabled) {
            this.setData({
                szzz1: ""
            })
        }
    },
    onSzzz2Input: function(e) {
        this.setData({
            szzz2: e.detail.value
        });
    },
    onSzzz2SwitchChange: function(e) {
        this.setData({
            szzz2Disabled: !e.detail.value
        });
        if (this.data.szzz2Disabled) {
            this.setData({
                szzz2: ""
            })
        }
    },
    onSzzz3Input: function(e) {
        this.setData({
            szzz3: e.detail.value
        });
    },
    onSzzz3SwitchChange: function(e) {
        this.setData({
            szzz3Disabled: !e.detail.value
        });
        if (this.data.szzz3Disabled) {
            this.setData({
                szzz3: ""
            })
        }
    },
    onSzzz4Input: function(e) {
        this.setData({
            szzz4: e.detail.value
        });
    },
    onSzzz4SwitchChange: function(e) {
        this.setData({
            szzz4Disabled: !e.detail.value
        });
        if (this.data.szzz4Disabled) {
            this.setData({
                szzz4: ""
            })
        }
    },
    onSzzz5Input: function(e) {
        this.setData({
            szzz5: e.detail.value
        });
    },
    onSzzz5SwitchChange: function(e) {
        this.setData({
            szzz5Disabled: !e.detail.value
        });
        if (this.data.szzz5Disabled) {
            this.setData({
                szzz5: ""
            })
        }
    },
    onSzxyInput: function(e) {
        this.setData({
            szxy: e.detail.value
        });
    },
    onSzxySwitchChange: function(e) {
        this.setData({
            szxyDisabled: !e.detail.value
        });
        if (this.data.szxyDisabled) {
            this.setData({
                szxy: ""
            })
        }
    },
    onSzyyInput: function(e) {
        this.setData({
            szyy: e.detail.value
        });
    },
    onSzyySwitchChange: function(e) {
        this.setData({
            szyyDisabled: !e.detail.value
        });
        if (this.data.szyyDisabled) {
            this.setData({
                szyy: ""
            })
        }
    },
    onSzgjymNGSInput: function(e) {
        this.setData({
            szgjymNGS: e.detail.value
        });
    },
    onSzgjymNGSSwitchChange: function(e) {
        this.setData({
            szgjymNGSDisabled: !e.detail.value
        });
        if (this.data.szgjymNGSDisabled) {
            this.setData({
                szgjymNGS: ""
            })
        }
    },
    onSzzzmNGSInput: function(e) {
        this.setData({
            szzzmNGS: e.detail.value
        });
    },
    onSzzzmNGSSwitchChange: function(e) {
        this.setData({
            szzzmNGSDisabled: !e.detail.value
        });
        if (this.data.szzzmNGSDisabled) {
            this.setData({
                szzzmNGS: ""
            })
        }
    },
    onCsljymNGSInput: function(e) {
        this.setData({
            csljymNGS: e.detail.value
        });
    },
    onCsljymNGSSwitchChange: function(e) {
        this.setData({
            csljymNGSDisabled: !e.detail.value
        });
        if (this.data.csljymNGSDisabled) {
            this.setData({
                csljymNGS: ""
            })
        }
    },

    onZznMGSResultInput: function(e) {
        this.setData({
            zznMGSResult: e.detail.value
        });
    },
    onZznMGSResultSwitchChange: function(e) {
        this.setData({
            zznMGSResultDisabled: !e.detail.value
        });
        if (this.data.zznMGSResultDisabled) {
            this.setData({
                zznMGSResult: ""
            })
        }
    },
    onCsljyInput: function(e) {
        this.setData({
            csljy: e.detail.value
        });
    },
    onCsljySwitchChange: function(e) {
        this.setData({
            csljyDisabled: !e.detail.value
        });
        if (this.data.csljyDisabled) {
            this.setData({
                csljy: ""
            })
        }
    },
    onMsisChange: function(e) {
        this.setData({
            msisIndex: e.detail.value,
        });
    },
    // onMsisSwitchChange: function(e) {
    //     this.setData({
    //         msisDisabled: !e.detail.value
    //     });
    //     if (this.data.msisDisabled) {
    //         this.setData({
    //             msisIndex: 0
    //         })
    //     }
    // },
    onZzclChange: function(e) {
        this.setData({
            zzclIndex: e.detail.value,
        });
    },
    // onZzclSwitchChange: function(e) {
    //     this.setData({
    //         zzclDisabled: !e.detail.value
    //     });
    //     if (this.data.zzclDisabled) {
    //         this.setData({
    //             zzclIndex: 0
    //         })
    //     }
    // },
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
                                that.data.vasImgArr[0] = img11;
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
                                that.data.vasImgArr[0] = img11;
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
                }
                break;
        }
    },
    // -------- 上传图片 end  ---------- //

    onLoad: function(options) {
        // this.loadProgress();
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
        })
        // 右侧
        this.setData({
            doudaoIndex: info.bein.sious,
            sqesr: this.getDefaultNum(info.bein.preoperative_esr),
            sqcrp: this.getDefaultNum(info.bein.preoperative_crp),
            bzhcrp: this.getDefaultNum(info.bein.normal_crp),
            il6: this.getDefaultNum(info.bein.il6),
            il6Disabled: this.getNumDisable(info.bein.il6),
            xwdby: this.getDefaultNum(info.bein.fibrinogen),
            xwdbyDisabled: this.getNumDisable(info.bein.fibrinogen),
            ddimer: this.getDefaultNum(info.bein.dimer),
            ddimerDisabled: this.getNumDisable(info.bein.dimer),
            shoushuDate: this.getDefaultDate(info.bein.operation_date),
            ssDateDisabled: this.getNumDisable(info.bein.operation_date),
            szjnIndex: info.bein.culture_pus,
            szjnDisabled: this.getNumDisable(info.bein.culture_pus),
            blIndex: info.bein.pathology,
            blDisabled: this.getNumDisable(info.bein.pathology),
            szLEIndex: info.bein.intrao_le_testpaper_stoste,
            szLEDisabled: this.getNumDisable(info.bein.intrao_le_testpaper_stoste),

            szLEAfterIndex: info.bein.intrao_le_testpaper_centrifugal,
            szLEAfterDisabled: this.getNumDisable(info.bein.intrao_le_testpaper_centrifugal),
            pic10: info.bein.intrao_le_testpaper_centr_pic.pic10Upload ? info.bein.intrao_le_testpaper_centr_pic.pic10Upload : '',
            pic10Upload: info.bein.intrao_le_testpaper_centr_pic_file.pic10Upload ? info.bein.intrao_le_testpaper_centr_pic_file.pic10Upload : '',
            pic11: info.bein.intrao_le_testpaper_centr_pic.pic11Upload ? info.bein.intrao_le_testpaper_centr_pic.pic11Upload : '',
            pic11Upload: info.bein.intrao_le_testpaper_centr_pic_file.pic11Upload ? info.bein.intrao_le_testpaper_centr_pic_file.pic11Upload : '',
            pic12: info.bein.intrao_le_testpaper_centr_pic.pic12Upload ? info.bein.intrao_le_testpaper_centr_pic.pic12Upload : '',
            pic12Upload: info.bein.intrao_le_testpaper_centr_pic_file.pic12Upload ? info.bein.intrao_le_testpaper_centr_pic_file.pic12Upload : '',
            szgjybxb: this.getDefaultNum(info.bein.intrao_joint_fluid_leukocyte),
            szgjybxbDisabled: this.getNumDisable(info.bein.intrao_joint_fluid_leukocyte),
            szgjyzxl: this.getDefaultNum(info.bein.intrao_neutrophils_percent),
            szgjyzxlDisabled: this.getNumDisable(info.bein.intrao_neutrophils_percent),
            szzz1: info.bein.culture_result1,
            szzz1Disabled: this.getValueDisable(info.bein.culture_result1),
            szzz2: info.bein.culture_result2,
            szzz2Disabled: this.getValueDisable(info.bein.culture_result2),
            szzz3: info.bein.culture_result3,
            szzz3Disabled: this.getValueDisable(info.bein.culture_result3),
            szzz4: info.bein.culture_result4,
            szzz4Disabled: this.getValueDisable(info.bein.culture_result4),
            szzz5: info.bein.culture_result5,
            szzz5Disabled: this.getValueDisable(info.bein.culture_result5),
            szxy: info.bein.intrao_aerobic_culture_result,
            szxyDisabled: this.getValueDisable(info.bein.intrao_aerobic_culture_result),
            szyy: info.bein.intrao_anaerobic_culture_result,
            szyyDisabled: this.getValueDisable(info.bein.intrao_anaerobic_culture_result),
            szgjymNGS: info.bein.culture_ngs_result,
            szgjymNGSDisabled: this.getValueDisable(info.bein.culture_ngs_result),
            szzzmNGS: info.bein.tissue_ngs_result,
            szzzmNGSDisabled: this.getValueDisable(info.bein.tissue_ngs_result),
            csljymNGS: info.bein.ultrasonic_degradation_ngs_result,
            csljymNGSDisabled: this.getValueDisable(info.bein.ultrasonic_degradation_ngs_result),

            zznMGSResult: info.bein.tissue_ngs_result,
            zznMGSResultDisabled: this.getNumDisable(info.bein.tissue_ngs_result),
            csljy: info.bein.ultrasonic_degradation_ngs_result,
            csljyDisabled: this.getNumDisable(info.bein.ultrasonic_degradation_ngs_result),
            msisIndex: info.bein.msis,
            msisDisabled: this.getNumDisable(info.bein.msis),
            zzclIndex: info.bein.final_disposal,
            zzclDisabled: this.getNumDisable(info.bein.final_disposal)
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
            this.submitAdmission()
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

            // 症状出现时长
            duration_symptoms: parseInt(that.data.symptomDateMultiIndex[2]),
            // 症状出现时长单位。1天，2月(必填项)
            duration_symptoms_unit: parseInt(that.data.symptomDateMultiIndex[1]),
            // 症状出现时长性质。1急性，2慢性(必填项)
            duration_symptoms_prop: parseInt(that.data.xingzhiIndex),
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
                service: 'Case.CreateEditCasePuncture',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                json_data: that.makeLeftData()
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.CreateEditCasePuncture:" + JSON.stringify(res))
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
        if (this.data.sszlIndex == 0) {
            this.showToast("请选择首诊治疗情况")
            return false;
        }
        if (this.data.leixingIndex == 0) {
            this.showToast("请选择类型")
            return false;
        }


        return true
    },

    makeLeftData() {
        let that = this
        var jsonData = {
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

    getDefaultValue(value) {
        return value.length == 0 ? 0 : value
    },

    // 入院后
    submitAdmission() {
        if (!this.isAdmissionValueRight()) {
            return;
        }
        let that = this;
        that.showLoading();
        wx.request({
            url: constant.basePath,
            data: {
                service: 'Case.CreateEditCaseBein',
                case_id: that.data.caseId,
                openid: app.globalData.openid,
                json_data: that.makePunctureData()
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("Case.CreateEditCaseBein:" + JSON.stringify(res))
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
    makePunctureData() {
        let that = this
        var lePic = {
            pic7Upload: that.data.pic7Upload,
            pic8Upload: that.data.pic8Upload,
            pic9Upload: that.data.pic9Upload,
        }
        var leCentrPic = {
            pic10Upload: that.data.pic10Upload,
            pic11Upload: that.data.pic11Upload,
            pic12Upload: that.data.pic12Upload,
        }
        var jsonData = {
            sious: parseInt(that.data.doudaoIndex),
            preoperative_esr: parseInt(this.getDefaultValue(that.data.sqesr)),
            preoperative_crp: parseFloat(this.getDefaultValue(that.data.sqcrp)),
            normal_crp: parseFloat(this.getDefaultValue(that.data.bzhcrp)),
            il6: parseFloat(this.getDefaultValue(that.data.il6)),
            fibrinogen: parseFloat(this.getDefaultValue(that.data.xwdby)),
            dimer: parseFloat(this.getDefaultValue(that.data.ddimer)),
            operation_date: that.data.ssDateDisabled ? 0 : new Date(that.data.shoushuDate).getTime() / 1000,
            culture_pus: parseInt(this.getDefaultValue(that.data.szjnIndex)),
            pathology: parseInt(this.getDefaultValue(that.data.blIndex)),
            intrao_le_testpaper_stoste: parseInt(this.getDefaultValue(that.data.szLEIndex)),
            intrao_le_testpaper_pic: JSON.stringify(lePic),
            intrao_le_testpaper_centrifugal: parseInt(this.getDefaultValue(that.data.szLEAfterIndex)),
            intrao_le_testpaper_centr_pic: JSON.stringify(leCentrPic),
            intrao_joint_fluid_leukocyte: parseFloat(this.getDefaultValue(that.data.szgjybxb)),
            intrao_neutrophils_percent: parseFloat(this.getDefaultValue(that.data.szgjyzxl)),
            culture_result1: that.data.szzz1,
            culture_result2: that.data.szzz2,
            culture_result3: that.data.szzz3,
            culture_result4: that.data.szzz4,
            culture_result5: that.data.szzz5,
            intrao_aerobic_culture_result: that.data.szxy,
            intrao_anaerobic_culture_result: that.data.szyy,
            culture_ngs_result: that.data.szgjymNGS,
            tissue_ngs_result: that.data.zznMGSResult,
            ultrasonic_degradation_ngs_result: that.data.csljy,
            msis: parseInt(this.getDefaultValue(that.data.msisIndex)),
            final_disposal: parseInt(this.getDefaultValue(that.data.zzclIndex)),
        }
        console.log("入院后：" + JSON.stringify(jsonData))
        return JSON.stringify(jsonData)
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
        if (this.data.type == 0) {
            this.showToast("请选择类型")
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
        if (!this.data.tel2Disabled && this.data.tel2.length == 0) {
            this.showToast("请填写联系电话2")
            return false;
        }

        return true;
    },
    isAdmissionValueRight() {
        if (this.data.doudaoIndex == 0) {
            this.showToast("请选择与假体相通的窦道")
            return false;
        }
        if (this.data.sqesr.length <= 0) {
            this.showToast("请填写术前ESR")
            return false;
        }
        if (this.data.sqcrp.length <= 0) {
            this.showToast("请填写术前CRP")
            return false;
        }
        if (!this.data.il6Disabled && this.data.il6.length == 0) {
            this.showToast("请填写IL-6")
            return false;
        }
        if (!this.data.xwdbyDisabled && this.data.xwdby.length == 0) {
            this.showToast("请填写纤维蛋白原")
            return false;
        }
        if (!this.data.ddimerDisabled && this.data.ddimer.length == 0) {
            this.showToast("请填写D-dimer")
            return false;
        }
        if (!this.data.ssDateDisabled && this.data.shoushuDate == "请选择日期") {
            this.showToast("请选择手术日期")
            return false;
        }
        if (!this.data.szjnDisabled && this.data.szjnIndex == 0) {
            this.showToast("请选择术中见脓")
            return false;
        }
        if (!this.data.blDisabled && this.data.blIndex == 0) {
            this.showToast("请选择病理")
            return false;
        }
        if (!this.data.szLEDisabled && this.data.szLEIndex == 0) {
            this.showToast("请选择术中LE试纸(原液)")
            return false;
        }
        if (!this.data.szLEAfterDisabled && this.data.szLEAfterIndex == 0) {
            this.showToast("请选择术中LE试纸(离心后)")
            return false;
        }
        if (!this.data.szgjybxbDisabled && this.data.szgjybxb.length == 0) {
            this.showToast("请填写术中关节液白细胞计数")
            return false;
        }
        if (!this.data.szgjyzxlDisabled && this.data.szgjyzxl.length == 0) {
            this.showToast("请填写术中关节液中性粒细胞百分比")
            return false;
        }
        if (!this.data.szzz1Disabled && this.data.szzz1.length == 0) {
            this.showToast("请填写术中组织培养结果1")
            return false;
        }
        if (!this.data.szzz2Disabled && this.data.szzz2.length == 0) {
            this.showToast("请填写术中组织培养结果2")
            return false;
        }
        if (!this.data.szzz3Disabled && this.data.szzz3.length == 0) {
            this.showToast("请填写术中组织培养结果3")
            return false;
        }
        if (!this.data.szzz4Disabled && this.data.szzz4.length == 0) {
            this.showToast("请填写术中组织培养结果4")
            return false;
        }
        if (!this.data.szzz5Disabled && this.data.szzz5.length == 0) {
            this.showToast("请填写术中组织培养结果5")
            return false;
        }
        if (!this.data.szxyDisabled && this.data.szxy.length == 0) {
            this.showToast("请填写术中关节液需氧+真菌培养结果")
            return false;
        }
        if (!this.data.szyyDisabled && this.data.szyy.length == 0) {
            this.showToast("请填写术中关节液厌氧培养结果")
            return false;
        }
        if (!this.data.szgjymNGSDisabled && this.data.szgjymNGS.length == 0) {
            this.showToast("请填写术中关节液mNGS培养结果")
            return false;
        }
        if (!this.data.szzzmNGSDisabled && this.data.szzzmNGS.length == 0) {
            this.showToast("请填写术中组织mNGS培养结果")
            return false;
        }
        if (!this.data.csljymNGSDisabled && this.data.csljymNGS.length == 0) {
            this.showToast("请填写超声裂解液mNGS培养结果")
            return false;
        }
        if (!this.data.zznMGSResultDisabled && this.data.zznMGSResult.length == 0) {
            this.showToast("请填写组织mNGS结果")
            return false;
        }
        if (!this.data.csljyDisabled && this.data.csljy.length == 0) {
            this.showToast("请填写超声裂解液mNGS结果")
            return false;
        }
        if (this.data.msisIndex <= 0) {
            this.showToast("请选择MSIS最终判定")
            return false;
        }
        if (this.data.zzclIndex <= 0) {
            this.showToast("请选择最终处理")
            return false;
        }

        return true;
    },

    verify: function(e) {
        if (this.data.ShowBasic) { // 基本信息
            this.verifyBasic()
        } else if (this.data.ShowDiagnose) { // 左侧
            this.verifyDiagnose()
        } else if (this.data.ShowAdmission) { // 右侧
            this.verifyAdmission()
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
    verifyDiagnose() {
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
    verifyAdmission() {
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