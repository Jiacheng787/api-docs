import request from '@/utils/request'

const baseUrl = '/api/api-docs/apiDetail';
const apiDetail = {};

/**
 * @description 获取单个api接口信息
 * @param {*} operationId 
 */
apiDetail.getApiDetail = function (operationId) {
	return request({
		url: `${baseUrl}/getDetail?operationId=${operationId}`,
		method: 'get'
	})
}

/**
 * @description 创建api接口信息
 * @param {*} menuId 
 * @param {*} data 
 */
apiDetail.createNewDetail = function (menuId, data) {
	return request({
		url: `${baseUrl}/createDetail?menuId=${menuId}`,
		data,
		method: 'post'
	})
}

/**
 * @description 更新api接口信息
 * @param {*} operationId 
 * @param {*} parentMenuId 
 * @param {*} data 
 */
apiDetail.updateDetail = function (operationId, parentMenuId, data) {
	return request({
		url: `${baseUrl}/updateDetail?operationId=${operationId}&parentMenuId=${parentMenuId}`,
		data,
		method: 'put'
	})
}

/**
 * @description 删除api接口信息
 * @param {*} operationId 
 * @param {*} parentMenuId 
 */
apiDetail.deleteDetail = function (operationId, parentMenuId) {
	return request({
		url: `${baseUrl}/deleteDetail?operationId=${operationId}&parentMenuId=${parentMenuId}`,
		method: 'delete'
	})
}
export default apiDetail