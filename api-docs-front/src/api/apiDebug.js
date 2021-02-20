import request from '@/utils/request'

const baseUrl = '/api/api-docs/apiDebug';
const apiDebug = {};

/**
 * @description 接口调试
 * @param {*} data 
 */
apiDebug.debugger = function (data) {
	return request({
		url: `${baseUrl}/debugger`,
		data,
		method: 'post'
	})
}

export default apiDebug
