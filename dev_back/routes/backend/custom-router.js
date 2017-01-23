"use strict";
var express = require("express");
var User = require('../../models/UserMongoose');
var customerRouter = express.Router();
customerRouter.get('/', function (request, response) {
    var user = new User({
        email: "dani.schmitz@live.de"
    });
    response.send(user);
});
module.exports = customerRouter;
//# sourceMappingURL=custom-router.js.map