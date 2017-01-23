"use strict";
var express = require("express");
var Device = require('../../models/DeviceMongoose');
var deviceRouter = express.Router();
deviceRouter.get('/', function (request, response) {
    Device.find().exec()
        .then(function (result) {
        response.json(result);
    });
});
deviceRouter.post('/', function (request, response) {
    var device = new Device(request.body);
    device.createdBy = request.session.user;
    device.save()
        .then(function (device) {
        response.json(device);
    });
});
deviceRouter.post('/devicesBetweenDates', function (req, res) {
    Device.find({
        activeFrom: { $lt: req.body.endDate },
        $or: [
            { inactiveAt: { $gt: req.body.startDate } },
            { inactiveAt: null }
        ],
    }).exec(function (err, devices) {
        if (err)
            res.status(400).json(err);
        res.json(devices);
    });
});
module.exports = deviceRouter;
//# sourceMappingURL=device-router.js.map