'use strict';

module.exports = {
    /**
     * @description 接口数据格式化方法
     * @param {Boolean} success
     * @param {*} data
     * @param {String} msg
     * @param {Number} code
     */
    returnBody(success = true, data = {}, msg = '', code = 200) {
        this.status = code;
        this.body = { success, data, msg, code };
    },
}