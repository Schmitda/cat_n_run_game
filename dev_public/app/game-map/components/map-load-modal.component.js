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
    function MapLoadModalComponent(mapService, mapCreator, ref, renderer) {
        var _this = _super.call(this) || this;
        _this.mapService = mapService;
        _this.mapCreator = mapCreator;
        _this.ref = ref;
        _this.renderer = renderer;
        _this.mapService.getAll().subscribe(function (results) {
            _this.maps = results;
        });
        return _this;
    }
    MapLoadModalComponent.prototype.hide = function () {
        this.renderer.setElementStyle(this.ref.nativeElement, 'display', 'none');
        return _super.prototype.hide.call(this);
    };
    MapLoadModalComponent.prototype.loadMap = function (map) {
        var _this = this;
        this.mapCreator.clearMap();
        setTimeout(function () {
            _this.mapCreator.loadMap(map);
        }, 0);
        this.hide();
    };
    MapLoadModalComponent.prototype.show = function () {
        this.renderer.setElementStyle(this.ref.nativeElement, 'display', 'block');
        return _super.prototype.show.call(this);
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
    __metadata("design:paramtypes", [map_service_1.MapService, map_creator_service_1.MapCreator, core_1.ElementRef, core_1.Renderer])
], MapLoadModalComponent);
exports.MapLoadModalComponent = MapLoadModalComponent;
//# sourceMappingURL=map-load-modal.component.js.map