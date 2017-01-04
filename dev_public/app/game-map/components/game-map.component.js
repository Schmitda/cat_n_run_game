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
var decoration_component_1 = require("./decoration.component");
var map_service_1 = require("../../shared/services/map.service");
var map_creator_service_1 = require("../../shared/services/map-creator.service");
var map_load_modal_component_1 = require("./map-load-modal.component");
var collectible_component_1 = require("./collectible.component");
var map_element_component_1 = require("./map-element.component");
var character_component_1 = require("./character.component");
var character_service_1 = require("../services/character.service");
var map_representation_service_1 = require("../../shared/services/map-representation.service");
var GameMapComponent = (function () {
    function GameMapComponent(mapService, mapCreator, characterService, mapRepresentationService, mapElement) {
        var _this = this;
        this.mapService = mapService;
        this.mapCreator = mapCreator;
        this.characterService = characterService;
        this.mapRepresentationService = mapRepresentationService;
        this.mapElement = mapElement;
        this.backgroundImage = '';
        this.zoom = 1;
        this.pause = false;
        this._gameOver = false;
        this.isRunning = false;
        this._hasWon = false;
        this.loadAnotherMap = false;
        this.fps = 0;
        this.characterService.gameMap = this;
        this.mapCreator.mapLoaded.subscribe(function (value) {
            if (value) {
                _this.reinitializeGame();
                _this.setBackground();
                _this.zoom = 1 / (924 / document.documentElement.clientHeight);
            }
        });
        this.mapCreator.mapLoaded.subscribe(function (value) {
            if (value) {
                _this.gameLoop();
            }
        });
    }
    GameMapComponent.prototype.onKeyDown = function (event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 27: {
                this.pause = !this.pause;
                if (this.pause == false) {
                    this.gameLoop();
                }
                else {
                    this.stopGame();
                }
                break;
            }
            case 13: {
                if (this.loadAnotherMap == false) {
                    this.pause = true;
                    this.loadAnotherMap = true;
                    this.mapLoadModal.show();
                }
                else {
                    this.loadAnotherMap = false;
                    this.mapLoadModal.hide();
                    this.pause = false;
                }
                break;
            }
            case 32: {
                if (this.pause == false) {
                    this.characterService.startJumping();
                }
                break;
            }
        }
        if (this.pause == false && this.gameOver == false) {
            switch (event.keyCode) {
                case 39: {
                    this.characterService.startMovingRight();
                    event.stopPropagation();
                    event.preventDefault();
                    break;
                }
                case 37: {
                    this.characterService.startMovingLeft();
                    event.stopPropagation();
                    event.preventDefault();
                    break;
                }
            }
        }
    };
    GameMapComponent.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 39: {
                this.characterService.keyReleased();
                break;
            }
            case 37: {
                this.characterService.keyReleased();
                break;
            }
        }
    };
    GameMapComponent.prototype.calculateZoom = function () {
        this.zoom = 1 / (924 / document.documentElement.clientHeight);
    };
    GameMapComponent.prototype.reinitializeGame = function () {
        this.characterService.live = 2;
        document.body.scrollLeft = 0;
        this.gameOver = false;
        this.pause = false;
        this.hasWon = false;
    };
    GameMapComponent.prototype.calculateFPS = function () {
        if (this.lastFPSCheckDate === undefined) {
            this.lastFPSCheckDate = new Date();
        }
        this.fps = Math.ceil(1000 / (this.loopBeginning.getTime() - this.lastFPSCheckDate.getTime()));
        this.lastFPSCheckDate = this.loopBeginning;
    };
    GameMapComponent.prototype.stopGame = function () {
        clearInterval(this.gameLoopInterval);
        this.zoom = 1;
        this.isRunning = false;
    };
    GameMapComponent.prototype.gameLoop = function () {
        var _this = this;
        if (this.isRunning == false) {
            this.calculateZoom();
            this.isRunning = true;
            this.gameLoopInterval = setInterval(function () {
                _this.gameLoop();
            }, 16.6666);
        }
        else {
            this.loopBeginning = new Date();
            this.calculateFPS();
            this.processCharacter();
            this.characterService.checkIfMoved();
            this.processGravity();
            this.processMap();
        }
    };
    GameMapComponent.prototype.reverseZoom = function () {
        return 1 / this.zoom;
    };
    GameMapComponent.prototype.processMap = function () {
        this.mapRepresentationService.scrollBody();
    };
    GameMapComponent.prototype.processGravity = function () {
        this.characterService.processGravity();
    };
    GameMapComponent.prototype.processCharacter = function () {
        this.characterService.accelerate();
        this.characterService.moveCharacter();
        this.characterService.checkPosition();
        this.characterService.checkLive();
    };
    GameMapComponent.prototype.playerHasWon = function () {
        var _this = this;
        this.hasWon = true;
        this.stopGame();
        setTimeout(function () {
            _this.mapLoadModal.show();
        }, 3000);
    };
    GameMapComponent.prototype.ngAfterViewInit = function () {
        this.mapRepresentationService.gameMap = this;
        this.mapLoadModal.show();
    };
    GameMapComponent.prototype.ngOnInit = function () {
    };
    GameMapComponent.prototype.setBackground = function () {
        this.backgroundImage = 'url(http://localhost:55/' + this.mapCreator.background.source + ')';
    };
    Object.defineProperty(GameMapComponent.prototype, "hasWon", {
        get: function () {
            return this._hasWon;
        },
        set: function (value) {
            this._hasWon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "gameOver", {
        get: function () {
            return this._gameOver;
        },
        set: function (value) {
            this._gameOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "playgroundWidth", {
        get: function () {
            return this._playgroundWidth;
        },
        set: function (value) {
            this._playgroundWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "playgroundHeight", {
        get: function () {
            return this._playgroundHeight;
        },
        set: function (value) {
            this._playgroundHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "playgroundRation", {
        get: function () {
            return this._playgroundRation;
        },
        set: function (value) {
            this._playgroundRation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "defaultWidth", {
        get: function () {
            return this._defaultWidth;
        },
        set: function (value) {
            this._defaultWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "defaultHeight", {
        get: function () {
            return this._defaultHeight;
        },
        set: function (value) {
            this._defaultHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapComponent.prototype, "defaultRatio", {
        get: function () {
            return this._defaultRatio;
        },
        set: function (value) {
            this._defaultRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    return GameMapComponent;
}());
__decorate([
    core_1.ViewChildren(decoration_component_1.DecorationComponent),
    __metadata("design:type", core_1.QueryList)
], GameMapComponent.prototype, "decorationComponents", void 0);
__decorate([
    core_1.ViewChildren(collectible_component_1.CollectibleComponent),
    __metadata("design:type", core_1.QueryList)
], GameMapComponent.prototype, "collectibleComponents", void 0);
__decorate([
    core_1.ViewChildren(map_element_component_1.MapElementComponent),
    __metadata("design:type", core_1.QueryList)
], GameMapComponent.prototype, "mapElementComponents", void 0);
__decorate([
    core_1.ViewChildren(character_component_1.CharacterComponent),
    __metadata("design:type", core_1.QueryList)
], GameMapComponent.prototype, "characterComponents", void 0);
__decorate([
    core_1.ViewChild(map_load_modal_component_1.MapLoadModalComponent),
    __metadata("design:type", map_load_modal_component_1.MapLoadModalComponent)
], GameMapComponent.prototype, "mapLoadModal", void 0);
__decorate([
    core_1.HostBinding('style.background-image'),
    __metadata("design:type", String)
], GameMapComponent.prototype, "backgroundImage", void 0);
__decorate([
    core_1.HostBinding('style.zoom'),
    __metadata("design:type", Number)
], GameMapComponent.prototype, "zoom", void 0);
__decorate([
    core_1.HostListener('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onKeyDown", null);
__decorate([
    core_1.HostListener('window:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onKeyUp", null);
GameMapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '',
        templateUrl: '../templates/game-map.component.html',
        styleUrls: ['../css/game-map.component.min.css'],
    }),
    __metadata("design:paramtypes", [map_service_1.MapService, map_creator_service_1.MapCreator, character_service_1.CharacterService, map_representation_service_1.MapRepresentationService, core_1.ElementRef])
], GameMapComponent);
exports.GameMapComponent = GameMapComponent;
//# sourceMappingURL=game-map.component.js.map