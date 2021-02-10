import Mock from 'mockjs'

import apiList from './apiList'

Mock.setup({
    timeout: '300-600', // 模拟响应延迟
})

Mock.mock(/\/api\/api-docs\/system-info\/apiBaseInfo/, 'get', apiList.getApiBaseInfo);
Mock.mock(/\/api\/api-docs\/system-info\/apiList/, 'get', apiList.getApiNavMenu);
Mock.mock(/\/api\/api-docs\/system-info\/apiDetail/, 'get', apiList.getApiDetail);

export default Mock