"use strict";
var Rx = require('rx');
var User = require("../models/UserMongoose");
var Utils = (function () {
    function Utils() {
    }
    Utils.getCurrentUser = function (req) {
        return Rx.Observable.create(function (observer) {
            User.findById(req.session.user._id).exec(function (err, user) {
                if (err) {
                    observer.onError(err);
                    observer.onCompleted();
                }
                else {
                    observer.onNext(user);
                    observer.onCompleted();
                }
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map