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
var GameMapComponent = (function () {
    function GameMapComponent(mapService, mapCreator) {
        var _this = this;
        this.mapService = mapService;
        this.mapCreator = mapCreator;
        this.backgroundImage = '';
        this.mapCreator.mapLoaded.subscribe(function (value) {
            if (value) {
                _this.setBackground();
            }
        });
    }
    GameMapComponent.prototype.ngAfterViewInit = function () {
        this.mapLoadModal.show();
    };
    GameMapComponent.prototype.ngOnInit = function () {
    };
    GameMapComponent.prototype.setBackground = function () {
        this.backgroundImage = 'url(http://localhost:55/' + this.mapCreator.background.source + ')';
        console.log('url(http://localhost:55/' + this.mapCreator.background.source + ')');
    };
    return GameMapComponent;
}());
__decorate([
    core_1.ViewChildren(decoration_component_1.DecorationComponent),
    __metadata("design:type", core_1.QueryList)
], GameMapComponent.prototype, "decorationComponents", void 0);
__decorate([
    core_1.ViewChild(map_load_modal_component_1.MapLoadModalComponent),
    __metadata("design:type", map_load_modal_component_1.MapLoadModalComponent)
], GameMapComponent.prototype, "mapLoadModal", void 0);
__decorate([
    core_1.HostBinding('style.background-image'),
    __metadata("design:type", String)
], GameMapComponent.prototype, "backgroundImage", void 0);
GameMapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '',
        templateUrl: '../templates/game-map.component.html',
        styleUrls: ['../css/game-map.component.min.css'],
    }),
    __metadata("design:paramtypes", [map_service_1.MapService, map_creator_service_1.MapCreator])
], GameMapComponent);
exports.GameMapComponent = GameMapComponent;
//# sourceMappingURL=game-map.component.js.map