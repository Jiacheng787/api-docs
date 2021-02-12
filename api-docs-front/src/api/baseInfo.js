import request from '@/utils/request'

const baseUrl = '/api/api-docs/baseInfo';
const baseInfo = {};

/**
 * @description 获取api文档基本信息
 */
baseInfo.getApiBaseInfo = function() {
    return request({
        url: `${baseUrl}/getBaseInfo`,
        method: 'get'
    })
}

export default baseInfo