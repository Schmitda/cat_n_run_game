"use strict";
var requestLogger = function (request, response, next) {
    console.info((new Date()).toUTCString() + "|" + request.method + "|" + request.url + "|" + request.ip);
    next();
};
module.exports = requestLogger;
//# sourceMappingURL=request-logger.js.map