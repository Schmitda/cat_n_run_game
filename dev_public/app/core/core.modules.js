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
var common_1 = require("@angular/common");
var map_service_1 = require("../shared/services/map.service");
var map_creator_service_1 = require("../shared/services/map-creator.service");
var map_representation_service_1 = require("../shared/services/map-representation.service");
var map_load_service_1 = require("../game-map/services/map-load.service");
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        /*  declarations: [ TitleComponent ],
          exports:      [ TitleComponent ],*/
        providers: [map_service_1.MapService, map_creator_service_1.MapCreator, map_representation_service_1.MapRepresentationService, map_load_service_1.MapLoadService]
    }),
    __metadata("design:paramtypes", [])
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.modules.js.map