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
var game_map_routing_1 = require("./game-map.routing");
var shared_module_1 = require("../shared/shared.module");
var game_map_component_1 = require("./components/game-map.component");
var decoration_component_1 = require("./components/decoration.component");
var character_component_1 = require("./components/character.component");
var map_element_component_1 = require("./components/map-element.component");
var collectible_component_1 = require("./components/collectible.component");
var character_service_1 = require("./services/character.service");
var GameMapModule = (function () {
    function GameMapModule() {
    }
    GameMapModule = __decorate([
        core_1.NgModule({
            imports: [game_map_routing_1.gameMapRouting, shared_module_1.SharedModule],
            providers: [character_service_1.CharacterService],
            declarations: [game_map_component_1.GameMapComponent, decoration_component_1.DecorationComponent, character_component_1.CharacterComponent, map_element_component_1.MapElementComponent, collectible_component_1.CollectibleComponent],
            exports: []
        }), 
        __metadata('design:paramtypes', [])
    ], GameMapModule);
    return GameMapModule;
}());
exports.GameMapModule = GameMapModule;
//# sourceMappingURL=game-map.module.js.map