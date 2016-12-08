"use strict";
var express = require("express");
var frontendRouter = express.Router();
frontendRouter.get('*', function (request, response) {
    response.sendfile('./dev_public/app/index.html'); // load our public/index.html file
});
frontendRouter.get('/', function (request, response) {
    response.sendfile('./dev_public/app/index.html'); // load our public/index.html file
});
module.exports = frontendRouter;
//# sourceMappingURL=frontend.js.map