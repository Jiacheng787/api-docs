import request from '@/utils/request'

const baseUrl = '/api/api-docs/docs';
let systemInfo = {};

/**
 * @description 获取api文档基本信息
 */
systemInfo.getApiBaseInfo = function() {
    return request({
        url: `${baseUrl}/getBaseInfo`,
        method: 'get'
    })
}

/**
 * @description 获取api列表，页面左侧菜单栏
 */
systemInfo.getApiList = function() {
    return request({
        url: `${baseUrl}/getMenuList`,
        method: 'get'
    })
}

/**
 * @description 获取单个api接口信息
 * @param {*} id 
 */
systemInfo.getApiDetail = function(operationId) {
    return request({
        url: `${baseUrl}/getDetail?operationId=${operationId}`,
        method: 'get'
    })
}

export default systemInfo