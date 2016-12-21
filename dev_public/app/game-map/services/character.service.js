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
var map_representation_service_1 = require("../../shared/services/map-representation.service");
var CharacterService = (function () {
    function CharacterService(mapRepresentationService) {
        this.mapRepresentationService = mapRepresentationService;
        this._isWalking = false;
        this._speed = 0;
        this._live = 2;
        this.direction = "right";
        this.gravity = 9.81;
        this.initalGravity = 9.81;
        this.jumpMaxDuration = 0.3;
        this.accelerationTime = 3000;
        this.isJumping = false;
        this.isFalling = false;
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
    CharacterService.prototype.startJumping = function () {
        var xYPosition = this.getXYPosition();
        if (this.isJumping == false) {
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == true) {
                console.log(this);
                this.isJumping = true;
                this.gravity = 0;
                this.jumpStart = new Date();
            }
            else {
                this.gravity = this.initalGravity;
                this.isJumping = false;
            }
        }
    };
    CharacterService.prototype.checkJumping = function () {
        var date = new Date();
        if (this.isJumping && (date.getTime() - this.jumpStart.getTime()) / 1000 > this.jumpMaxDuration) {
            this.isJumping = false;
            this.gravity = this.initalGravity;
        }
        /*   if(date.getTime() - this.jumpStart.getTime() / 1000 > this.jumpMaxDuration /2){
         this.isFalling = true;
         }*/
    };
    CharacterService.prototype.accelerate = function () {
        if (this.isWalking) {
            var date = new Date();
            this.speed = (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10 > 1 ? 1 : (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10;
        }
    };
    CharacterService.prototype.moveCharacter = function () {
        this.checkJumping();
        if (this.lastPictureChange == undefined) {
            this.lastPictureChange = new Date();
        }
        if (this.characterComponent) {
            if (this.direction == "right" && this.isWalking) {
                this.characterComponent.xCoord = this.characterComponent.xCoord + (10 * this.speed);
                this.characterComponent.rotate = false;
                if (this.isJumping) {
                    this.characterComponent.yCoord = this.characterComponent.yCoord - (10 * this.speed);
                }
            }
            else if (this.direction == "left" && this.isWalking) {
                this.characterComponent.rotate = true;
                this.characterComponent.xCoord = this.characterComponent.xCoord - (10 * this.speed);
                if (this.isJumping) {
                    this.characterComponent.yCoord = this.characterComponent.yCoord - (10 * this.speed);
                }
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
    CharacterService.prototype.checkIfMoved = function () {
        if (this.isWalking) {
            this.hasMoved = true;
        }
        else {
            this.hasMoved = false;
        }
    };
    CharacterService.prototype.setCharacterComponent = function (characterComponent) {
        this.characterComponent = characterComponent;
    };
    CharacterService.prototype.getXYPosition = function () {
        var rectangle = this.characterComponent.imgElement.nativeElement.getBoundingClientRect();
        var x = rectangle.left + rectangle.width / 2;
        var y = rectangle.bottom;
        return { x: x, y: y };
    };
    CharacterService.prototype.processGravity = function () {
        /*if (this.hasMoved) {*/
        var date = new Date();
        var xYPosition = this.getXYPosition();
        if (this.gravity > 0) {
            //TODO check cat is on element function
            console.log(this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y));
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == false) {
                var xYPosition_1 = this.getXYPosition();
                var element_1 = this.mapRepresentationService.isInMapElementAndGetElement(xYPosition_1.x, xYPosition_1.y + 1);
                this.characterComponent.yCoord = this.characterComponent.yCoord + (this.gravity * 0.5);
                if (element_1) {
                    if (this.mapRepresentationService.isInTopBorder(xYPosition_1.y, element_1)) {
                        this.characterComponent.yCoord = element_1.yCoord - this.characterComponent.element.height + 45;
                    }
                }
            }
        }
        /*}*/
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
    Object.defineProperty(CharacterService.prototype, "gameMape", {
        set: function (value) {
            this._gameMape = value;
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
    __metadata("design:paramtypes", [map_representation_service_1.MapRepresentationService])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map