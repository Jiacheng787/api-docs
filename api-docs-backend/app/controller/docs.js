'use strict';

const Controller = require('egg').Controller;

class DocsController extends Controller {
  async getBaseInfo() {
    const { ctx } = this;
    const res = await ctx.model.BaseInfo.find();
    ctx.returnBody(true, res, '', 200);
  }
  async getMenuList() {
    const { ctx } = this;
    const res = await ctx.model.NavMenu.find();
    ctx.returnBody(true, res, '', 200);
  }
  async getDetail() {
    const { ctx } = this;
    const { operationId } = ctx.query;
    const res = await ctx.model.ApiDetails.findOne({operationId});
    ctx.returnBody(true, res, '', 200);
  }
}

module.exports = DocsController;
