'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const NavMenuSchema = new Schema({
        icon: { type: String },
        title: { type: String },
        children: { type: Array },
    });
    return mongoose.model('nav_menu', NavMenuSchema, 'nav_menu');
};