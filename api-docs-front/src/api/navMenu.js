import request from '@/utils/request'

const baseUrl = '/api/api-docs/navMenu';
const navMenu = {};

/**
 * @description 获取api列表，页面左侧菜单栏
 */
navMenu.getApiList = function() {
    return request({
        url: `${baseUrl}/getMenuList`,
        method: 'get'
    })
}

/**
 * @description 创建新分类
 * @param {*} data 
 */
navMenu.createNewSort = function(data) {
    return request({
        url: `${baseUrl}/createNewSort`,
        data,
        method: 'post'
    })
}

/**
 * @description 更新分类
 * @param {*} data 
 */
navMenu.updateSort = function(data) {
    return request({
        url: `${baseUrl}/updateSort`,
        data,
        method: 'put'
    })
}

/**
 * @description 删除分类
 * @param {*} data 
 */
navMenu.deleteSort = function(data) {
    return request({
        url: `${baseUrl}/deleteSort`,
        data,
        method: 'delete'
    })
}

export default navMenu