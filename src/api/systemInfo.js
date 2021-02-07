import request from '@/utils/request'

const baseUrl = '/api/api-docs/system-info';
let systemInfo = {};

/**
 * @description 获取api文档基本信息
 */
systemInfo.getApiBaseInfo = function() {
    return request({
        url: `${baseUrl}/apiBaseInfo`,
        method: 'get'
    })
}

/**
 * @description 获取api列表，页面左侧菜单栏
 */
systemInfo.getApiList = function() {
    return request({
        url: `${baseUrl}/apiList`,
        method: 'get'
    })
}

/**
 * @description 获取单个api接口信息
 * @param {*} id 
 */
systemInfo.getApiDetail = function(id) {
    return request({
        url: `${baseUrl}/apiDetail?id=${id}`,
        method: 'get'
    })
}

export default systemInfo