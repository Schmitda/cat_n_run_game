import express = require("express");
import User = require('../../models/UserMongoose');



let customerRouter = express.Router();
customerRouter.get('/', (request: express.Request, response: express.Response) => {

    var user = new User({
        email: "dani.schmitz@live.de"
    })

    response.send(user);
});


// add more route handlers here
// e.g. customerRouter.post('/', (req,res,next)=> {/*...*/})

export = customerRouter;