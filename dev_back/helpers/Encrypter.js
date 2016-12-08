var bcrypt = require('bcryptjs');
var Rx = require('Rx');


function generateSalt(password) {

}



module.exports = {

    generateRandom: function(number){
        return Rx.Observable.create(function(observer){
            bcrypt.genSalt(number, function(err, code){
                observer.onNext(code);
                observer.onCompleted();
            });
        })
    },

    encryptPassword: function (password) {
        return Rx.Observable.create(function(o){
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    o.onNext(hash);
                    o.onCompleted();
                });
            });
        });
    },

    verifyPassword: function(password, hash){
        return Rx.Observable.create(function(o) {
            bcrypt.compare(password, hash, function (err, res) {
                console.log(password);
                console.log(hash);
                console.log(res);
                o.onNext(res);
                o.onCompleted();
            });
        });
    }
};