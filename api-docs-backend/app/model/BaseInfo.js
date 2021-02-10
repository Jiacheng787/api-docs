'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const BaseInfoSchema = new Schema({
        title: { type: String },
        description: { type: String },
        version: { type: String },
        host: { type: String },
        basePath: { type: String },
        url: { type: String },
    });
    // 使用 MongoDB Compass 可视化工具创建数据库，创建 base_info 的 collection 并导入数据
    // 虽然 egg-moogoose 连接到了数据库，但是不能读到数据（返回空数组）
    // egg-mongoose 官方示例只传了两个参数
    // 实际上 mongoose.model 需要传三个参数，第三个参数是 collection 名称
    // 如果第三个参数缺省，会自动根据第一个参数以复数形式生成 collection
    return mongoose.model('base_info', BaseInfoSchema, 'base_info');
};