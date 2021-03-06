"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
var MapService = (function () {
    function MapService(http) {
        this.http = http;
    }
    MapService.prototype.save = function (map) {
        delete map._id;
        return this.http.post('http://schmitz-dynamics.ch:60/api/map', map)
            .map(this.extractData);
    };
    MapService.prototype.getAll = function () {
        return this.http.get('http://schmitz-dynamics.ch:60/api/map')
            .map(this.extractData);
    };
    MapService.prototype.getById = function (id) {
        return this.http.get('http://schmitz-dynamics.ch:60/api/map/' + id)
            .map(this.extractData);
    };
    MapService.prototype.update = function (map) {
        return this.http.put('http://schmitz-dynamics.ch:60/api/map/' + map._id, map)
            .map(this.extractData);
    };
    MapService.prototype.delete = function (id) {
        return this.http.delete('http://schmitz-dynamics.ch:60/api/map/' + id)
            .map(this.extractData);
    };
    MapService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map