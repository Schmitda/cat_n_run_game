"use strict";
var express = require("express");
var requestLogger = require("./middleware/request-logger");
var customerRouter = require("./routes/backend/custom-router");
var frontendRouter = require("./routes/frontend/frontend");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSession = require("express-session");
var FileStore = require('session-file-store')(expressSession);
var cookieParser = require("cookie-parser");
var Config_1 = require("../config/Config");
var WebApi = (function () {
    function WebApi(app, port) {
        this.app = app;
        this.port = port;
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }
    WebApi.prototype.configureMiddleware = function (app) {
        var db = Config_1.Config.getConfiguration();
        app.use(requestLogger);
        console.log("executed");
        app.use(methodOverride('X-HTTP-Method-Override'));
        //SETTING UP BODY-PARSER
        app.use(bodyParser.json());
        app.use((bodyParser.json({
            type: "application/vnd.api+json"
        })));
        //SETTING UP COOKIES
        app.use(cookieParser());
        //SETTING UP SESSSIONS
        app.use(expressSession({
            store: new FileStore(db.filestoreSessionOptions),
            secret: db.salt,
            resave: true,
            saveUninitialized: false
        }));
        // PARSE x-www-form-urlencode
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(__dirname + '/../dev_public'));
        app.use('/nm', express.static(__dirname + '/../node_modules'));
    };
    WebApi.prototype.configureRoutes = function (app) {
        app.use('/customer', customerRouter);
        app.use('/', frontendRouter);
    };
    WebApi.prototype.run = function () {
        this.app.listen(this.port);
    };
    return WebApi;
}());
exports.WebApi = WebApi;
//# sourceMappingURL=WebApi.js.map