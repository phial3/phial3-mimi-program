// pages/addsign/addsign.js
var util = require('../../utils/util.js');
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        globalid: [],
        array: ['男', '女'],
        sex: 0,
        visitCausearray: ['面试', '开会', '拜访顾客', '项目实施', '其他'],
        visitCause: 0,
        organarray: ['生产部', '运营部', '营销部'],
        visitOrganId: 0,
        date: '2021-06-01',
        name: '',
        phone: '',
        idNumber: '',
        subscribeTime: '',
        visitCompany: '',
        interviewee: '',
        visitOrgan: '',
        //日期选择器
        minHour: 0,
        maxHour: 24,
        minDate: new Date(1990, 1, 1).getTime(),
        maxDate: new Date(2099, 12, 31).getTime(),
        currentDate: new Date().getTime(),
        show: false,
        currentChoose: ''
    },
    //日期选择器的处理
    openPicker() {
        this.setData({
            show: true
        })
    },
    onConfirm(e) {
        this.setData({
            show: false,
            currentChoose: this.formatDate(new Date(e.detail))
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    onCancel() {
        this.setData({
            show: false
        })
    },
    formatDate(date) {
        let taskStartTime
        if (date.getMonth() < 9) {
            taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
        } else {
            taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
        }
        if (date.getDate() < 10) {
            taskStartTime += "0" + date.getDate()
        } else {
            taskStartTime += date.getDate()
        }
        taskStartTime += " " + date.getHours() + ":" + date.getMinutes()
        this.setData({
            taskStartTime: taskStartTime,
        })
        return taskStartTime;
    },

    //男女
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            sex: e.detail.value
        })
    },

    //来访事由
    bindPickerChangeCause: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            visitCause: e.detail.value
        })
    },
    //部门
    bindPickerOrgan: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            visitOrganId: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = util.formatDateTime(new Date());
        this.setData({
            currentChoose: time
        });
    },
    setInput: function (e) {
        const {
            name
        } = e.target.dataset
        this.data[name] = e.detail.value

        this.setData(this.data)
    },
    confirmPublish: function () {

        var that = this

        const data = {}
        data.name = this.data.name
        data.sex = this.data.sex
        data.phone = this.data.phone
        data.idNumber = this.data.idNumber
        data.subscribeTime = this.data.currentChoose
        data.visitCause = this.data.visitCause
        data.visitCompany = this.data.visitCompany
        data.interviewee = this.data.interviewee
        data.visitOrgan = this.data.visitOrgan

        data.visitOrganId = this.data.visitOrganId
        console.log(JSON.stringify(data))


        wx.request({
            url: 'http://192.xxx.4.1xx:8093/cs-applet/subscribe/addCallerSubscribe',
            method: 'POST',
            data: data,
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {

            },
            fail: function (error) {
                wx.showToast({
                    title: error.message || '保存失败'
                })
                console.log(error)
            }
        })
    },
})
