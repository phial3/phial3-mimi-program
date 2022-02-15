const app = getApp()

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.baseUrl + url,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res.data)
            }
        })
    })
}

const get = (url, options = {}) => {
    console.log('url : ' + url + ', params : ' + options.data)
    return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
    console.log('url : ' + url + ', params : ' + options.data)
    return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
    return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
}

module.exports = {
    get,
    post,
    put,
    remove
}