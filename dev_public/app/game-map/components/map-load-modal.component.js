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
var core_1 = require('@angular/core');
var Modal_1 = require("../../shared/components/Modal");
var map_service_1 = require("../../shared/services/map.service");
var map_creator_service_1 = require("../../shared/services/map-creator.service");
var map_load_service_1 = require("../services/map-load.service");
var MapLoadModalComponent = (function (_super) {
    __extends(MapLoadModalComponent, _super);
    function MapLoadModalComponent(mapService, mapCreator, ref, renderer, mapLoadService) {
        var _this = this;
        _super.call(this);
        this.mapService = mapService;
        this.mapCreator = mapCreator;
        this.ref = ref;
        this.renderer = renderer;
        this.mapLoadService = mapLoadService;
        this.isMobile = false;
        this.checkIsMobile();
        this.mapService.getAll().subscribe(function (results) {
            _this.maps = results;
        });
        this.mapLoadService.mapLoadComponent = this;
    }
    MapLoadModalComponent.prototype.onWindowScroll = function (event) {
        if (this.isMobile) {
            this.ref.nativeElement.style.left = document.body.scrollLeft + "px";
            this.scrollLeft = document.body.scrollLeft;
        }
    };
    MapLoadModalComponent.prototype.checkIsMobile = function () {
        var _this = this;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            _this.isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
    };
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
    __decorate([
        core_1.HostListener('window:scroll', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapLoadModalComponent.prototype, "onWindowScroll", null);
    MapLoadModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-load-modal',
            templateUrl: '../templates/map-load-modal.component.html',
            styleUrls: ['../css/map-load-modal.component.min.css'],
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService, map_creator_service_1.MapCreator, core_1.ElementRef, core_1.Renderer, map_load_service_1.MapLoadService])
    ], MapLoadModalComponent);
    return MapLoadModalComponent;
}(Modal_1.Modal));
exports.MapLoadModalComponent = MapLoadModalComponent;
//# sourceMappingURL=map-load-modal.component.js.map