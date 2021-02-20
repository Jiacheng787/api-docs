'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ApiDetailsSchema = new Schema({
        parentMenuId: { type: String }, // 删除、更新的时候用于查找接口分类
        summary: { type: Object },
        description: { type: String },
        reqParams: { type: Array },
        reqExample: { type: Object },
        resStatus: { type: Array },
        resParams: { type: Array },
        resExample: { type: Object },
    });
    return mongoose.model('api_details', ApiDetailsSchema, 'api_details');
};