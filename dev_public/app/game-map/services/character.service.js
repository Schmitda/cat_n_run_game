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
        this.mapRepresentationService.characterService = this;
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
        if (this._characterComponent) {
            if (this.direction == "right" && this.isWalking) {
                this._characterComponent.xCoord = this._characterComponent.xCoord + (10 * this.speed);
                this._characterComponent.rotate = false;
                if (this.isJumping) {
                    this._characterComponent.yCoord = this._characterComponent.yCoord - (10 * this.speed);
                }
            }
            else if (this.direction == "left" && this.isWalking) {
                this._characterComponent.rotate = true;
                this._characterComponent.xCoord = this._characterComponent.xCoord - (10 * this.speed);
                if (this.isJumping) {
                    this._characterComponent.yCoord = this._characterComponent.yCoord - (10 * this.speed);
                }
            }
        }
        if (this.isWalking) {
            var date = new Date();
            if (date.getTime() - this.lastPictureChange.getTime() > 33) {
                this.lastPictureChange = date;
                if (this._characterComponent.element.walkAnimation.length - 1 > this._characterComponent.imageNumber) {
                    this._characterComponent.imageNumber++;
                }
                else {
                    this._characterComponent.imageNumber = 0;
                }
            }
        }
        else {
            this._characterComponent.imageNumber = 0;
        }
    };
    CharacterService.prototype.checkPosition = function () {
        if (this.getXYPosition().y > document.documentElement.clientHeight * (1 / this.gameMap.zoom)) {
            this.live = 0;
        }
        var collectible = this.mapRepresentationService.getCollectibleCatTouches();
        if (collectible) {
            if (collectible.element.reward == 'winningPoint') {
                this.gameMap.playerHasWon();
            }
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
        this._characterComponent = characterComponent;
    };
    CharacterService.prototype.getXYPosition = function () {
        var rectangle = this._characterComponent.imgElement.nativeElement.getBoundingClientRect();
        var x = this._characterComponent.xCoord + this.characterComponent.element.width / 2;
        var y = rectangle.bottom;
        return { x: x, y: y };
    };
    CharacterService.prototype.processGravity = function () {
        var date = new Date();
        var xYPosition = this.getXYPosition();
        if (this.gravity > 0) {
            //TODO check cat is on element function
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == false) {
                var xYPosition_1 = this.getXYPosition();
                this._characterComponent.yCoord = this._characterComponent.yCoord + (this.gravity * 0.5);
            }
        }
    };
    CharacterService.prototype.checkLive = function () {
        if (this.live <= 0) {
            this._gameMap.gameOver = true;
            this._gameMap.stopGame();
        }
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
    Object.defineProperty(CharacterService.prototype, "gameMap", {
        get: function () {
            return this._gameMap;
        },
        set: function (value) {
            this._gameMap = value;
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
    Object.defineProperty(CharacterService.prototype, "characterComponent", {
        get: function () {
            return this._characterComponent;
        },
        set: function (value) {
            this._characterComponent = value;
        },
        enumerable: true,
        configurable: true
    });
    CharacterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [map_representation_service_1.MapRepresentationService])
    ], CharacterService);
    return CharacterService;
}());
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map