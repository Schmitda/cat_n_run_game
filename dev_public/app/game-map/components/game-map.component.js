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
var collectible_component_1 = require("./collectible.component");
var map_element_component_1 = require("./map-element.component");
var character_component_1 = require("./character.component");
var character_service_1 = require("../services/character.service");
var map_representation_service_1 = require("../../shared/services/map-representation.service");
var map_load_service_1 = require("../services/map-load.service");
var GameMapComponent = (function () {
    function GameMapComponent(mapService, mapCreator, characterService, mapRepresentationService, mapElement, mapLoadService) {
        var _this = this;
        this.mapService = mapService;
        this.mapCreator = mapCreator;
        this.characterService = characterService;
        this.mapRepresentationService = mapRepresentationService;
        this.mapElement = mapElement;
        this.mapLoadService = mapLoadService;
        this.backgroundImage = '';
        /*@HostBinding('style.transform') scale: string = 'scale(1)';*/
        this.zoom = 1;
        this.touchTolerance = 100;
        this.pause = false;
        this._gameOver = false;
        this.isRunning = false;
        this._hasWon = false;
        this.loadAnotherMap = false;
        this.touchStart = new Date();
        this.fps = 0;
        this.isMobile = false;
        this.characterService.gameMap = this;
        this.checkIsMobile();
        this.mapCreator.mapLoaded.subscribe(function (value) {
            if (value) {
                _this.reinitializeGame();
                _this.setBackground();
                _this.calculateZoom();
            }
        });
        this.mapCreator.mapLoaded.subscribe(function (value) {
            if (value) {
                _this.gameLoop();
            }
        });
    }
    GameMapComponent.prototype.onKeyDown = function (event) {
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
                    this.mapLoadService.mapLoadComponent.show();
                }
                else {
                    this.loadAnotherMap = false;
                    this.mapLoadService.mapLoadComponent.hide();
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
    GameMapComponent.prototype.onResize = function (event) {
        this.pauseAndStopGame();
    };
    GameMapComponent.prototype.onOrientationChange = function (event) {
        this.pauseAndStopGame();
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
    GameMapComponent.prototype.onTouchStart = function (event) {
        if (new Date().getTime() - this.touchStart.getTime() < 300) {
            this.pause = !this.pause;
            if (this.pause == false) {
                this.gameLoop();
            }
            else {
                this.stopGame();
            }
        }
        else {
            this.touchStart = new Date();
            this.touchStartX = event.touches[0].pageX;
            this.touchStartY = event.touches[0].pageY;
        }
    };
    GameMapComponent.prototype.onTouchMove = function (event) {
        var currentX = event.touches[0].pageX;
        var currentY = event.touches[0].pageY;
        if (this.touchStartY - currentY > this.touchTolerance) {
            this.characterService.startJumping();
        }
        if (currentX - this.touchStartX > this.touchTolerance) {
            this.characterService.startMovingRight();
        }
        else if (currentX - this.touchStartX < -this.touchTolerance) {
            this.characterService.startMovingLeft();
        }
        event.preventDefault();
    };
    GameMapComponent.prototype.onWindowScroll = function (event) {
        this.scrollLeft = document.body.scrollLeft;
    };
    GameMapComponent.prototype.onTouchEnd = function (event) {
        this.characterService.keyReleased();
    };
    GameMapComponent.prototype.checkIsMobile = function () {
        var _this = this;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            _this.isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
    };
    GameMapComponent.prototype.calcLeft = function () {
        if (this.isMobile) {
            return this.scrollLeft * this.reverseZoom() + 'px';
        }
    };
    GameMapComponent.prototype.pauseAndStopGame = function () {
        this.pause = true;
        this.stopGame();
    };
    GameMapComponent.prototype.calculateZoom = function () {
        this.zoom = 1 / (924 / document.documentElement.clientHeight);
        this.clientWidth = document.documentElement.clientWidth * this.reverseZoom();
        this.clientHeight = document.documentElement.clientHeight * this.reverseZoom();
        this.scale = 'scale(' + this.zoom + ')';
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
            _this.mapLoadService.mapLoadComponent.show();
        }, 3000);
    };
    GameMapComponent.prototype.ngAfterViewInit = function () {
        this.mapRepresentationService.gameMap = this;
        this.mapLoadService.mapLoadComponent.show();
    };
    GameMapComponent.prototype.ngOnInit = function () {
    };
    GameMapComponent.prototype.setBackground = function () {
        this.backgroundImage = 'url(http://schmitz-dynamics.ch:55/' + this.mapCreator.background.source + ')';
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
            var _this = this;
            this._gameOver = value;
            if (value == true) {
                setTimeout(function () {
                    _this.mapLoadService.mapLoadComponent.show();
                }, 4000);
            }
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
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onResize", null);
__decorate([
    core_1.HostListener('window:orientationchange', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onOrientationChange", null);
__decorate([
    core_1.HostListener('window:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onKeyUp", null);
__decorate([
    core_1.HostListener('touchstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TouchEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onTouchStart", null);
__decorate([
    core_1.HostListener('touchmove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TouchEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onTouchMove", null);
__decorate([
    core_1.HostListener('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onWindowScroll", null);
__decorate([
    core_1.HostListener('touchend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TouchEvent]),
    __metadata("design:returntype", void 0)
], GameMapComponent.prototype, "onTouchEnd", null);
GameMapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '',
        templateUrl: '../templates/game-map.component.html',
        styleUrls: ['../css/game-map.component.min.css'],
    }),
    __metadata("design:paramtypes", [map_service_1.MapService, map_creator_service_1.MapCreator, character_service_1.CharacterService, map_representation_service_1.MapRepresentationService, core_1.ElementRef, map_load_service_1.MapLoadService])
], GameMapComponent);
exports.GameMapComponent = GameMapComponent;
//# sourceMappingURL=game-map.component.js.map