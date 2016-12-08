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
var core_1 = require("@angular/core");
var Modal_1 = require("../../shared/components/Modal");
var map_service_1 = require("../../shared/services/map.service");
var map_creator_service_1 = require("../../shared/services/map-creator.service");
var MapLoadModalComponent = (function (_super) {
    __extends(MapLoadModalComponent, _super);
    function MapLoadModalComponent(mapService, mapCreator) {
        var _this = _super.call(this) || this;
        _this.mapService = mapService;
        _this.mapCreator = mapCreator;
        _this.mapService.getAll().subscribe(function (results) {
            _this.maps = results;
        });
        return _this;
    }
    MapLoadModalComponent.prototype.loadMap = function (map) {
        this.mapCreator.loadMap(map);
        this.hide();
    };
    MapLoadModalComponent.prototype.ngOnInit = function () {
    };
    return MapLoadModalComponent;
}(Modal_1.Modal));
MapLoadModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'map-load-modal',
        templateUrl: '../templates/map-load-modal.component.html',
        styleUrls: ['../css/map-load-modal.component.min.css'],
    }),
    __metadata("design:paramtypes", [map_service_1.MapService, map_creator_service_1.MapCreator])
], MapLoadModalComponent);
exports.MapLoadModalComponent = MapLoadModalComponent;
//# sourceMappingURL=map-load-modal.component.js.map