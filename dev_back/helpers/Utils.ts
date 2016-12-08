import Rx = require('rx');
import IUser = require("../models/IUser");
import User = require("../models/UserMongoose");
import Observable = Rx.Observable;
import Observer = Rx.Observer;
import express = require("express");
import Entry = require("../models/EntryMongoose");
import IEntry = require("../models/IEntry");

export class Utils{


    constructor() {

    }

    public static getCurrentUser(req: express.Request):Observable<IUser>{
        return Rx.Observable.create(function(observer:Observer<any>){
            User.findById(req.session.user._id).exec(function(err, user){
                if(err){
                    observer.onError(err);
                    observer.onCompleted();
                }else{
                    observer.onNext(user);
                    observer.onCompleted();
                }
            })
        })
    }



   /* public createEntries(startDate: Date, endDate: Date){
        return Rx.Observable.create(function(observer:Observer<any>){
            Entry.find({'recurrentEvent': true}).exec((err, entries) => {
                entries.forEach((entry:IEntry) => {
                    switch (entry.frequency){
                        case 'daily': {

                        }
                        case 'weekly': {

                        }
                        case 'monthly': {

                        }
                        case 'yearly': {

                        }
                    }
                })
            });
        });
    }*/
}