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
var MapRepresentationService = (function () {
    function MapRepresentationService() {
    }
    Object.defineProperty(MapRepresentationService.prototype, "gameMap", {
        get: function () {
            return this._gameMap;
        },
        set: function (value) {
            this._gameMap = value;
        },
        enumerable: true,
        configurable: true
    });
    MapRepresentationService.prototype.isIn = function (x, y, elementToCheck) {
        var isInXElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        var isInYElement = (elementToCheck.yCoord < y && elementToCheck.yCoord - elementToCheck.element.height < y);
        return isInXElement && isInYElement;
    };
    MapRepresentationService.prototype.isOn = function (x, y, elementToCheck) {
        var isXOnElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        var isYOnElement = (elementToCheck.yCoord >= y && elementToCheck.yCoord + 1 > y);
        return isXOnElement && isYOnElement;
    };
    MapRepresentationService.prototype.isInTopBorder = function (y, element) {
        console.log(y);
        console.log(element.yCoord);
        return (element.yCoord + 45 + 20 > y && element.yCoord < y);
    };
    MapRepresentationService.prototype.checkIfCatIsOnElement = function (x, y) {
        var _this = this;
        var foundElementCatIsOn = false;
        this.gameMap.mapElementComponents.forEach(function (mapElementComponent) {
            if (_this.isOn(x, y, mapElementComponent)) {
                foundElementCatIsOn = true;
            }
            ;
        });
        return !foundElementCatIsOn;
    };
    MapRepresentationService.prototype.isInMapElementAndGetElement = function (x, y) {
        var _this = this;
        var foundIsInMapElement = false;
        this.gameMap.mapElementComponents.forEach(function (mapElementComponent) {
            if (_this.isIn(x, y, mapElementComponent)) {
                foundIsInMapElement = mapElementComponent;
            }
        });
        return foundIsInMapElement;
    };
    return MapRepresentationService;
}());
MapRepresentationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MapRepresentationService);
exports.MapRepresentationService = MapRepresentationService;
//# sourceMappingURL=map-representation.service.js.map