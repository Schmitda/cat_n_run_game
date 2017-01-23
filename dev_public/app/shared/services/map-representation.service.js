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
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var MapRepresentationService = (function () {
    function MapRepresentationService() {
        this._defaultWidth = 1920 - 400;
        this._defaultHeight = 924;
        this._defaultRatio = 1.645;
        this._tookMeasure = new Rx_1.BehaviorSubject(null);
    }
    MapRepresentationService.prototype.scrollBody = function () {
        if (this._characterService) {
            var xYPosition = this._characterService.getXYPosition();
            var screenWidth = document.documentElement.clientWidth * this.gameMap.reverseZoom();
            var screenHeight = document.documentElement.clientHeight * this.gameMap.reverseZoom();
            if (xYPosition.x > screenWidth / 2) {
                var middlePoint = (Math.abs(document.body.getBoundingClientRect()['width'] / 2 + document.body.scrollLeft));
                var x = xYPosition.x * this.gameMap.zoom;
                var difference = x - middlePoint;
                if (difference > 1 || difference < -1) {
                    document.body.scrollLeft += difference;
                }
            }
            else {
                document.body.scrollLeft = 0;
            }
        }
    };
    MapRepresentationService.prototype.isTouching = function (baseElementOne, baseElementTwo) {
        var tc = baseElementOne.yCoord;
        var bc = baseElementOne.yCoord + baseElementOne.element.height;
        var lc = baseElementOne.xCoord;
        var rc = baseElementOne.xCoord + baseElementOne.element.width;
        var te = baseElementTwo.yCoord;
        var be = baseElementTwo.yCoord + baseElementTwo.element.height;
        var le = baseElementTwo.xCoord;
        var re = baseElementTwo.xCoord + baseElementTwo.element.width;
        if (bc >= te && lc <= le && tc <= te && rc >= le)
            return true;
        if (bc >= te && lc <= re && tc <= le && rc >= re)
            return true;
        if (bc >= be && lc <= le && tc <= be && rc >= le)
            return true;
        if (bc >= be && lc <= re && tc <= be && rc >= re)
            return true;
        return false;
    };
    MapRepresentationService.prototype.isIn = function (x, y, elementToCheck) {
        var isInXElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        var isInYElement = (y > elementToCheck.yCoord && elementToCheck.yCoord + elementToCheck.element.height < y);
        return isInXElement && isInYElement;
    };
    MapRepresentationService.prototype.isOn = function (x, y, elementToCheck) {
        var isXOnElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        var isYOnElement = (y >= elementToCheck.yCoord + 20 && y < elementToCheck.yCoord + 45 + 20);
        return isXOnElement && isYOnElement;
    };
    MapRepresentationService.prototype.isInTopBorder = function (y, element) {
        return (element.yCoord + 45 + 20 > y && element.yCoord < y);
    };
    MapRepresentationService.prototype.checkIfCatIsOnElement = function (x, y) {
        var _this = this;
        var foundElementCatIsOn = false;
        this.gameMap.mapElementComponents.forEach(function (mapElementComponent) {
            if (_this.isOn(x, y, mapElementComponent)) {
                foundElementCatIsOn = true;
            }
        });
        return foundElementCatIsOn;
    };
    MapRepresentationService.prototype.getCollectibleCatTouches = function () {
        var xYPosition = this.characterService.getXYPosition();
        for (var _i = 0, _a = this.gameMap.collectibleComponents.toArray(); _i < _a.length; _i++) {
            var collectible = _a[_i];
            if (this.isTouching(this.characterService.characterComponent, collectible)) {
                console.log("touchy touchy");
                return collectible;
            }
        }
        return false;
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
    Object.defineProperty(MapRepresentationService.prototype, "characterService", {
        get: function () {
            return this._characterService;
        },
        set: function (value) {
            this._characterService = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapRepresentationService.prototype, "gameMap", {
        get: function () {
            return this._gameMap;
        },
        set: function (value) {
            this._gameMap = value;
            this.takeMeasure();
        },
        enumerable: true,
        configurable: true
    });
    MapRepresentationService.prototype.takeMeasure = function () {
        this._playgroundWidth = document.documentElement.clientWidth;
        this._playgroundHeight = this.gameMap.mapElement.nativeElement.getBoundingClientRect()['height'];
        this._playgroundRatio = this._playgroundWidth / this._playgroundHeight;
        this._tookMeasure.next({
            defaultHeight: this._defaultHeight,
            defaultWidth: this._defaultWidth,
            defaultRatio: this._defaultRatio,
            playgroundWidth: this._playgroundWidth,
            playgroundHeight: this._playgroundHeight,
            playgroundRatio: this._playgroundRatio,
        });
    };
    Object.defineProperty(MapRepresentationService.prototype, "tookMeasure", {
        get: function () {
            return this._tookMeasure;
        },
        set: function (value) {
            this._tookMeasure = value;
        },
        enumerable: true,
        configurable: true
    });
    MapRepresentationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapRepresentationService);
    return MapRepresentationService;
}());
exports.MapRepresentationService = MapRepresentationService;
//# sourceMappingURL=map-representation.service.js.map