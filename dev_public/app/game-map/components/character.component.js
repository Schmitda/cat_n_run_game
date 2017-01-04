"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var element_1 = require("./element");
var game_map_component_1 = require("./game-map.component");
var map_service_1 = require("../../shared/services/map.service");
var character_service_1 = require("../services/character.service");
var CharacterComponent = (function (_super) {
    __extends(CharacterComponent, _super);
    function CharacterComponent(mapService, _gameMap, characterService, _ref) {
        var _this = _super.call(this) || this;
        _this.mapService = mapService;
        _this._gameMap = _gameMap;
        _this.characterService = characterService;
        _this._ref = _ref;
        _this._rotate = false;
        _this.characterService.setCharacterComponent(_this);
        return _this;
    }
    CharacterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.element.currentValue !== undefined) {
            this._image = this.element.walkAnimation;
            this.imageNumber = 0;
        }
    };
    CharacterComponent.prototype.setSelectedType = function () {
        this.mapService.selectedType = "character";
    };
    CharacterComponent.prototype.getImage = function () {
        return this._image[this.imageNumber];
    };
    CharacterComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(CharacterComponent.prototype, "imageNumber", {
        get: function () {
            return this._imageNumber;
        },
        set: function (value) {
            this._imageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterComponent.prototype, "rotate", {
        get: function () {
            return this._rotate;
        },
        set: function (value) {
            this._rotate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterComponent.prototype, "ref", {
        get: function () {
            return this._ref;
        },
        set: function (value) {
            this._ref = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterComponent.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterComponent.prototype, "gameMap", {
        get: function () {
            return this._gameMap;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterComponent;
}(element_1.BaseElement));
__decorate([
    core_1.ViewChild('imgElement'),
    __metadata("design:type", core_1.ElementRef)
], CharacterComponent.prototype, "imgElement", void 0);
CharacterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'character',
        templateUrl: '../templates/character.component.html',
        styleUrls: ['../css/character.component.min.css'],
    }),
    __param(1, core_1.Inject(core_1.forwardRef(function () { return game_map_component_1.GameMapComponent; }))),
    __metadata("design:paramtypes", [map_service_1.MapService, game_map_component_1.GameMapComponent, character_service_1.CharacterService, core_1.ElementRef])
], CharacterComponent);
exports.CharacterComponent = CharacterComponent;
//# sourceMappingURL=character.component.js.map