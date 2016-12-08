import express = require("express");


let frontendRouter = express.Router();
frontendRouter.get('*', (request: express.Request, response: express.Response) => {
    response.sendfile('./dev_public/app/index.html'); // load our public/index.html file
});

frontendRouter.get('/', (request: express.Request, response: express.Response) => {
    response.sendfile('./dev_public/app/index.html'); // load our public/index.html file
});


// add more route handlers here
// e.g. customerRouter.post('/', (req,res,next)=> {/*...*/})

export = frontendRouter;