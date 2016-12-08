import express = require('express');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');
import methodOverride = require('method-override');
import expressSession = require('express-session');
var FileStore = require('session-file-store')(expressSession);
import cookieParser = require('cookie-parser');
import {Config} from "./config/Config";
import {WebApi} from "./dev_back/WebApi";

let db = Config.getConfiguration();

var port:number = 60;

/****** SETUP-DEV & PRODUCTION ******/

//SETTING UP DB
mongoose.connect(db.url);

let api = new WebApi(express(), port);
api.run();
console.log('listen on ' + port)
