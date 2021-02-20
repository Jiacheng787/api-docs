'use strict';

const Controller = require('egg').Controller;

class ApiDebugController extends Controller {
	async debugger() {
		const { ctx } = this;
		const { reqMethod, reqUrl, backend, token, content } = ctx.request.body;

		try {
			if (!token || !token.match(/: /)) {
				throw Error('请求头格式错误！')
			}
			let key = token.split(": ")[0],
				val = token.split(": ")[1];
			console.log(`http://${backend}/${reqUrl}`)
			const result = await ctx.curl(`http://${backend}/${reqUrl}`, {
				method: reqMethod, //  除了 GET 之外都需要指定 method
				contentType: 'json', // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
				headers: { // 自定义请求头
					[key]: val,
				},
				data: content ? JSON.parse(content) : {}, // 请求体
				dataType: 'json', // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
				gzip: true, // 开启 gzip 之后，HttpClient 将自动设置 Accept-Encoding: gzip 请求头， 并且会自动解压带 Content-Encoding: gzip 响应头的数据
				timeout: 3000, // 创建连接超时3秒，接收响应超时3秒
				timing: true, // 开启请求各阶段的时间测量
			})
			ctx.returnBody(true, result.res, '', 200);
		} catch (e) {
			ctx.returnBody(false, {}, e.message, 200);
		}
	}
}

module.exports = ApiDebugController;
