'use strict';

const Controller = require('egg').Controller;

class ApiDetailController extends Controller {
  async getDetail() {
    const { ctx } = this;
    const { operationId } = ctx.query;
    const res = await ctx.model.ApiDetails.findOne({operationId});
    ctx.returnBody(true, res, '', 200);
  }
}

module.exports = ApiDetailController;
