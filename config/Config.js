"use strict";
var Config = (function () {
    function Config() {
    }
    Config.getConfiguration = function () {
        switch (process.env.NODE_ENV) {
            case undefined:
            case 'development':
                return {
                    url: 'mongodb://localhost:27017/taskmirror',
                    salt: "(qd5yBxWgmEdxEGb)JEl1iB2dAubsLWHS9jCiW$Z",
                    secret: "(qd5yBxWgmEdxEGb)JEl1iB2dAubsLWHS9jCiW$Z",
                    nodeMailer: {
                        host: 'send.one.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'no-reply@teamhives.net',
                            pass: ""
                        }
                    },
                    filestoreSessionOptions: {
                        path: "./sessions",
                        useAsync: true,
                        reapInterval: 5000,
                        retries: 5,
                        maxAge: 86400
                    }
                };
            case 'production':
                return {
                    url: 'mongodb://localhost:27017/taskmirror',
                    salt: "(qd5yBxWgmEdxEGb)JEl1iB2dAubsLWHS9jCiW$Z",
                    secret: "(qd5yBxWgmEdxEGb)JEl1iB2dAubsLWHS9jCiW$Z",
                    nodeMailer: {
                        host: 'send.one.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'no-reply@teamhives.net',
                            pass: ""
                        }
                    },
                    filestoreSessionOptions: {
                        path: "./sessions",
                        useAsync: true,
                        reapInterval: 5000,
                        retries: 5,
                        logFn: function () { },
                        maxAge: 86400
                    }
                };
            default:
                return {};
        }
    };
    ;
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map