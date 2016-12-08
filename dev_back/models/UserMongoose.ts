import mongoose = require("mongoose");
import IUser = require("./IUser");

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    name:String,
    firstname:String,
    lastname:String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    password:String,
    email:String,
    color:String
});

var User = mongoose.model<IUserModel>("User", userSchema);
export = User;