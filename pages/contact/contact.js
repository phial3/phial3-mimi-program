// pages/contact/contact.js

const utils = require('../../utils/util.js')

const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        currentDate: utils.formatDate(new Date()),
        startTime: '09:00', //开始时间
        endTime: '21:00',   //结束时间
        userName: '',
        userBranch: '',
        userPhone: '',
        projectName: ''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },


    bindDateChange(e) {
        this.setData({
            currentDate: e.detail.value
        })
    },

    startTimeSelect(e) {
        this.setData({
            startTime: e.detail.value
        })
    },

    endTimeSelect(e) {
        this.setData({
            endTime: e.detail.value
        })
    },

    userNameInput(e) {
        this.setData({
            userName: e.detail.value
        })
    },

    userBranchInput(e) {
        this.setData({
            userBranch: e.detail.value
        })
    },

    userPhoneInput(e) {
        this.setData({
            userPhone: e.detail.value
        })
    },

    projectNameInput(e) {
        this.setData({
            projectName: e.detail.value
        })
    },


    //提交input信息到后台
    formSubmit: function () {
        var that = this
        wx.request({
            // 注意，如果小程序开启校验合法域名时必须使用https协议,在测试的情况下可以不开启域名校验
            url: 'http://localhost:8088/api/bless/work-time',
            // 请求的方法,'GET' 或 'POST'
            method: 'POST',
            // 设置请求头，不能设置 Referer
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                userName: this.data.userName,
                userBranch: this.data.userBranch,
                userPhone: this.data.userPhone,
                projectName: this.data.projectName,
                currentDate: this.data.currentDate,
                startTime: this.data.startTime,
                endTime: this.data.endTime,
            },
            // 请求成功时的处理
            success: function (res) {
                // 打印接收到的数据
                console.log(res.data)
                if (res.statusCode == 200) {
                    wx.showModal({
                        title: '工时填报',
                        content: '保存成功！',
                        success(res) {
                            if (res.confirm) {
                                // 保存成功之后，跳转到下一页
                                setTimeout(() => {
                                    // navigateTo : 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
                                    // redirectTo : 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
                                    wx.redirectTo({
                                        url: '/pages/lucky-turntable/lucky-turntable',
                                    })
                                }, 1000);

                            } else if (res.cancel) {
                                console.log('用户点击取消')

                            }
                        }
                    })
                }
            },
            // 请求失败时的一些处理
            fail: function () {
                wx.showToast({
                    icon: "none",
                    mask: true,
                    title: "接口调用失败，请稍后再试。",
                });
            }
        })
    },
})