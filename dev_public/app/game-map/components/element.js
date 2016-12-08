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
var core_2 = require("@angular/core");
var BaseElement = (function () {
    function BaseElement() {
        this._hidden = false;
    }
    BaseElement.prototype.setVisible = function () {
        this._hidden = false;
    };
    BaseElement.prototype.ngOnInit = function () { };
    Object.defineProperty(BaseElement.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this._hidden = value;
        },
        enumerable: true,
        configurable: true
    });
    return BaseElement;
}());
__decorate([
    core_2.Input(),
    __metadata("design:type", Element)
], BaseElement.prototype, "element", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], BaseElement.prototype, "xCoord", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], BaseElement.prototype, "yCoord", void 0);
BaseElement = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'decoration',
        templateUrl: '../templates/decoration.component.html',
    }),
    __metadata("design:paramtypes", [])
], BaseElement);
exports.BaseElement = BaseElement;
//# sourceMappingURL=element.js.map