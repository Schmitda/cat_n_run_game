"use strict";
var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var FileStore = require('session-file-store')(expressSession);
var Config_1 = require("./config/Config");
var WebApi_1 = require("./dev_back/WebApi");
var db = Config_1.Config.getConfiguration();
var port = 65;
/****** SETUP-DEV & PRODUCTION ******/
//SETTING UP DB
mongoose.connect(db.url);
var api = new WebApi_1.WebApi(express(), port);
api.run();
console.log('listen on ' + port);
//# sourceMappingURL=server.js.map