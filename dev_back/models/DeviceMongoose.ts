import mongoose = require("mongoose");
import IDevice = require("./IDevice");

interface IDeviceModel extends IDevice, mongoose.Document { }

var deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
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

var Device = mongoose.model<IDeviceModel>("Device", deviceSchema);
export = Device;