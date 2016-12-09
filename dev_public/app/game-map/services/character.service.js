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
var CharacterService = (function () {
    function CharacterService() {
        this._isWalking = false;
        this._speed = 0;
        this._live = 2;
        this.direction = "right";
        this.accelerationTime = 3000;
    }
    CharacterService.prototype.startMovingRight = function () {
        if (this.isWalking == false || this.direction !== "right") {
            this.direction = "right";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    };
    CharacterService.prototype.startMovingLeft = function () {
        if (this.isWalking == false || this.direction !== "left") {
            this.direction = "left";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    };
    CharacterService.prototype.accelerate = function () {
        if (this.isWalking) {
            var date = new Date();
            this.speed = (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10 > 1 ? 1 : (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10;
        }
    };
    CharacterService.prototype.moveCharacter = function () {
        if (this.lastPictureChange == undefined) {
            this.lastPictureChange = new Date();
        }
        if (this.characterComponent) {
            if (this.direction == "right" && this.isWalking) {
                this.characterComponent.xCoord = this.characterComponent.xCoord + (10 * this.speed);
                this.characterComponent.rotate = false;
            }
            else if (this.direction == "left" && this.isWalking) {
                this.characterComponent.rotate = true;
                this.characterComponent.xCoord = this.characterComponent.xCoord - (10 * this.speed);
            }
        }
        if (this.isWalking) {
            var date = new Date();
            if (date.getTime() - this.lastPictureChange.getTime() > 33) {
                this.lastPictureChange = date;
                if (this.characterComponent.element.walkAnimation.length - 1 > this.characterComponent.imageNumber) {
                    this.characterComponent.imageNumber++;
                }
                else {
                    this.characterComponent.imageNumber = 0;
                }
            }
        }
        else {
            this.characterComponent.imageNumber = 0;
        }
    };
    CharacterService.prototype.setCharacterComponent = function (characterComponent) {
        this.characterComponent = characterComponent;
    };
    CharacterService.prototype.keyReleased = function () {
        this.isWalking = false;
        this.endMovingTime = new Date();
    };
    Object.defineProperty(CharacterService.prototype, "isWalking", {
        get: function () {
            return this._isWalking;
        },
        set: function (value) {
            this._isWalking = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterService.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterService.prototype, "live", {
        get: function () {
            return this._live;
        },
        set: function (value) {
            this._live = value;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterService;
}());
CharacterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map