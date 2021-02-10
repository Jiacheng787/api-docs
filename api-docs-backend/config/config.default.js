/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612927643153_9958';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // 错误处理中间件对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // mongodb 配置项
  // 27017 是默认端口号，api_docs 是数据库名
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/api_docs',
    options: {},
  };

  // 关闭 csrf token
  config.security = {
    csrf: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
