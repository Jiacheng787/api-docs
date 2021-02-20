'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 基本信息
  router.get('/api/api-docs/baseInfo/getBaseInfo', controller.baseInfo.getBaseInfo);
  // 分类管理
  router.get('/api/api-docs/navMenu/getMenuList', controller.navMenu.getMenuList);
  router.post('/api/api-docs/navMenu/createNewSort', controller.navMenu.createNewSort);
  router.put('/api/api-docs/navMenu/updateSort', controller.navMenu.updateSort);
  router.delete('/api/api-docs/navMenu/deleteSort', controller.navMenu.deleteSort);
  // 接口详情
  router.get('/api/api-docs/apiDetail/getDetail', controller.apiDetail.getDetail);
  router.post('/api/api-docs/apiDetail/createDetail', controller.apiDetail.createDetail);
  router.put('/api/api-docs/apiDetail/updateDetail', controller.apiDetail.updateDetail);
  router.delete('/api/api-docs/apiDetail/deleteDetail', controller.apiDetail.deleteDetail);
  // 接口调试
  router.post('/api/api-docs/apiDebug/debugger', controller.apiDebug.debugger);
};
