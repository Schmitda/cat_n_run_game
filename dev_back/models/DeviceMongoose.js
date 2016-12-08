"use strict";
var mongoose = require("mongoose");
var deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    activeFrom: {
        type: Date,
        default: Date.now()
    },
    inactiveAt: {
        type: Date,
    }
});
var Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
//# sourceMappingURL=DeviceMongoose.js.map