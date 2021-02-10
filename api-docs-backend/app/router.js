'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/api/api-docs/docs/getBaseInfo', controller.docs.getBaseInfo);
  router.get('/api/api-docs/docs/getMenuList', controller.docs.getMenuList);
  router.get('/api/api-docs/docs/getDetail', controller.docs.getDetail);
};
