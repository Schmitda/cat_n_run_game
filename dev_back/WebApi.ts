import express = require('express');
import requestLogger = require("./middleware/request-logger");
import customerRouter = require("./routes/backend/custom-router");
import frontendRouter = require("./routes/frontend/frontend");
import bodyParser = require("body-parser");
import mongoose = require('mongoose');
import methodOverride = require('method-override');
import expressSession = require('express-session');
var FileStore = require('session-file-store')(expressSession);
import cookieParser = require('cookie-parser');
import {Config} from "../config/Config";



export class WebApi{

    constructor(private app: express.Express, private port:number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app:express.Express){
        let db = Config.getConfiguration();
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
       /* app.use(expressSession({
            store: new FileStore(db.filestoreSessionOptions),
            secret: db.salt,
            resave: true,
            saveUninitialized: false
        }));*/
        // PARSE x-www-form-urlencode
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(__dirname + '/../dev_public'));
        app.use('/nm',express.static(__dirname + '/../node_modules'));
    }

    private configureRoutes(app: express.Express){
        app.use('/customer', customerRouter);
        app.use('/', frontendRouter);
    }

    public run(){
        this.app.listen(this.port)
    }
}