import request from '@/utils/request'

const baseUrl = '/api/api-docs/apiDetail';
const apiDetail = {};

/**
 * @description 获取单个api接口信息
 * @param {*} id 
 */
apiDetail.getApiDetail = function(operationId) {
    return request({
        url: `${baseUrl}/getDetail?operationId=${operationId}`,
        method: 'get'
    })
}
export default apiDetail