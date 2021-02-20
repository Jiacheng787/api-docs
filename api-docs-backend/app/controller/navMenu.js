'use strict';

const Controller = require('egg').Controller;

class NavMenuController extends Controller {
    async getMenuList() {
        const { ctx } = this;
        const res = await ctx.model.NavMenu.find();
        ctx.returnBody(true, res, '', 200);
    }
    async createNewSort() {
        const { ctx } = this;
        const { title, icon } = ctx.request.body;
        const res = await ctx.model.NavMenu.findOne({ title });
        if (res) {
            ctx.returnBody(false, {}, '名称重复！', 200);
        } else {
            await ctx.model.NavMenu.create({
                title,
                icon,
                children: []
            })
            ctx.returnBody(true, {}, '添加成功！', 200);
        }
    }
    async updateSort() {
        const { ctx } = this;
        const { id, title, icon } = ctx.request.body;
        const res = await ctx.model.NavMenu.findOne({ title });
        // console.log(typeof res._id) // object
        if(res && res._id != id) {
            ctx.returnBody(false, {}, '名称重复！', 200);
        } else {
            await ctx.model.NavMenu.updateOne({_id: id}, {title, icon})
            ctx.returnBody(true, {}, '更新成功！', 200);
        }
    }
    async deleteSort() {
        const { ctx } = this;
        const { id } = ctx.request.body;

        const { children } = await ctx.model.NavMenu.findOne({_id: id});
        const operationIdCollection = children.map(item => item.path);
        await ctx.model.ApiDetails.remove({_id: {$in: operationIdCollection}}); // 移除该分类下所有接口

        await ctx.model.NavMenu.remove({ _id: id }); // 移除分类

        ctx.returnBody(true, operationIdCollection, '删除成功！', 200);
    }
}

module.exports = NavMenuController;
