import express = require("express");
import Device = require('../../models/DeviceMongoose');
import IDevice = require("../../models/IDevice");


let deviceRouter = express.Router();
deviceRouter.get('/', (request: express.Request, response: express.Response) => {
    Device.find().exec()
        .then(function (result: IDevice[]) {
            response.json(result)
        })
});

deviceRouter.post('/', (request: express.Request, response: express.Response) => {
    let device = new Device(request.body);
    device.createdBy = request.session.user;
    device.save()
        .then((device: IDevice) => {
            response.json(device);
        });
});


deviceRouter.post('/devicesBetweenDates', (req: express.Request, res: express.Response) => {
    Device.find(
        {
            activeFrom: {$lt: req.body.endDate},
            $or: [
                {inactiveAt: {$gt: req.body.startDate}},
                {inactiveAt: null}
            ],
        }).exec( (err, devices) => {
            if(err)
                res.status(400).json(err);
            res.json(devices);
    })
});


// add more route handlers here
// e.g. customerRouter.post('/', (req,res,next)=> {/*...*/})

export = deviceRouter;