'use strict';

const Controller = require('egg').Controller;

class BaseInfoController extends Controller {
  async getBaseInfo() {
    const { ctx } = this;
    const res = await ctx.model.BaseInfo.find();
    ctx.returnBody(true, res, '', 200);
  }
}

module.exports = BaseInfoController;
