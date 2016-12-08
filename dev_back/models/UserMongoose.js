"use strict";
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    lastname: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    password: String,
    email: String,
    color: String
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=UserMongoose.js.map