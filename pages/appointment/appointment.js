// pages/appointment/appointment.js

const app = getApp();

const api = require('../../utils/api.js');
const util = require('../../utils/util.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: -1,
        cityIndex: -1,
        storeIndex: -1,

        provinceList: [],
        cityList: [],
        storeList: [],

        userName: '',
        userPhone: '',

        provinceName: '',
        provinceId: 0,

        cityName: '',
        cityId: 0,

        storeName: '',
        storeId: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 初始化加载所有地区列表
        api.get('/api/open/region', {
            data: ''
        }).then(res => {
            this.setData({ provinceList: res.data.list })
        }).catch(err => {
            console.log('err : ' + err)
            wx.showToast({
                title: 'api error!',
                icon: 'none'
            })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


    userNameInput(e) {
        this.setData({
            userName: e.detail.value
        })
    },


    userPhoneInput(e) {
        this.setData({
            userPhone: e.detail.value
        })
    },

    selectProvince(e) {
        console.log(e.detail)

        this.setData({
            index: e.detail.value,
            provinceName: this.data.provinceList[e.detail.value].name,
            provinceId: this.data.provinceList[e.detail.value].id
        })


        var that = this
        api.get('/api/open/region?parentId=' + this.data.provinceId, {
            data: ''
        }).then(res => {
            console.log(res.data)

            that.setData({
                cityList: res.data.list,

            })
        }).catch(err => {
            wx.showToast({
                title: 'api error!',
                icon: 'none'
            })
        })

    },


    selectCity(e) {
        console.log(e.detail)

        this.setData({
            cityIndex: e.detail.value,
            cityId: this.data.cityList[e.detail.value].id,
            cityName: this.data.cityList[e.detail.value].name
        })


        var that = this
        api.get('/api/open/store/all-stores?provinceCode=' + this.data.provinceId + '&cityCode=' + this.data.cityId, {
            data: ''
        }).then(res => {
            console.log(res.data)

            that.setData({
                storeList: res.data.list,
            })

        }).catch(err => {
            console.log('err : ' + err)
            wx.showToast({
                title: 'api error!',
                icon: 'none'
            })
        })
    },


    selectStore(e) {
        this.setData({
            storeIndex: e.detail.value,
            storeName: this.data.storeList[e.detail.value].name,
            storeId: this.data.storeList[e.detail.value].id,
        })

    },

    onSubmit() {

        wx.request({
            url: app.globalData.baseUrl + '/api/open/website/form/user',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: util.json2Form({
                name: this.data.userName,
                phone: this.data.userPhone,
                regionId: this.data.cityId,
                storeId: this.data.storeId,
                sourceFrom: 7
            }),
            success: function (res) {
                // 打印接收到的数据
                console.log(res.data)

                if (res.data.msg === "OK") {
                    wx.showModal({
                        title: '用户留资',
                        content: '提交成功！',
                        success(res) {
                            if (res.confirm) {

                            } else if (res.cancel) {
                                console.log('用户点击取消')

                            }
                        }
                    })
                } else {
                    wx.showToast({
                        icon: "error",
                        title: res.data.msg,
                    });
                }
            },
            fail: function () {
                wx.showToast({
                    icon: "none",
                    mask: true,
                    title: "接口调用失败，请稍后再试。",
                });
            }
        })

    }
})