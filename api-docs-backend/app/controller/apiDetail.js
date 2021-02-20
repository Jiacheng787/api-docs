'use strict';

const Controller = require('egg').Controller;
const mongoose = require('mongoose');

class ApiDetailController extends Controller {
  async getDetail() {
    const { ctx } = this;
    const { operationId } = ctx.query;

    try {
      mongoose.Types.ObjectId(operationId); // 尝试将接收到的参数转为ObjectId
      const res = await ctx.model.ApiDetails.findOne({_id: operationId});
      if (!res) throw new Error('接口不存在！');
      ctx.returnBody(true, res, '', 200);
    } catch (e) {
      ctx.returnBody(false, {}, e.message, 200);
    }
  }
  async createDetail() {
    const { ctx } = this;
    const { menuId } = ctx.query;
    const detail = ctx.request.body;

    Object.assign(detail, {parentMenuId: menuId}); // 添加接口分类的id
    const res = await ctx.model.ApiDetails.create(detail); // 添加接口详情

    const path = `${res._id}`,
          title = res.summary.title;
    const { children } = await ctx.model.NavMenu.findOne({_id: menuId});
    children.push({path, title});
    await ctx.model.NavMenu.updateOne({_id: menuId}, {children}); // 添加到接口分类菜单中

    ctx.returnBody(true, {}, '添加成功！', 200);
  }
  async updateDetail() {
    const { ctx } = this;
    const { operationId, parentMenuId } = ctx.query;
    const detail = ctx.request.body;

    await ctx.model.ApiDetails.updateOne({_id: operationId}, detail); // 更新接口详情

    let { children } = await ctx.model.NavMenu.findOne({_id: parentMenuId});
    for(let i in children) {
      if(children[i].path == operationId) {
        children[i].title = detail.summary.title;
        break;
      }
    }
    await ctx.model.NavMenu.updateOne({_id: parentMenuId}, {children}); // 更新接口分类

    ctx.returnBody(true, children, '更新成功！', 200);
  }
  async deleteDetail() {
    const { ctx } = this;
    const { operationId, parentMenuId } = ctx.query;

    let { children } = await ctx.model.NavMenu.findOne({_id: parentMenuId});
    children = children.filter(item => item.path !== operationId)
    await ctx.model.NavMenu.updateOne({_id: parentMenuId}, {children}); // 将接口从分类菜单中移除

    await ctx.model.ApiDetails.remove({_id: operationId}); // 删除接口详情

    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    ctx.returnBody(true, {}, '删除成功！', 200);
  }
}

module.exports = ApiDetailController;
