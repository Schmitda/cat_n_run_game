"use strict";
var Element = (function () {
    function Element() {
    }
    Object.defineProperty(Element.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (value) {
            this._source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "_id", {
        get: function () {
            return this.__id;
        },
        set: function (value) {
            this.__id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "touchable", {
        get: function () {
            return this._touchable;
        },
        set: function (value) {
            this._touchable = value;
        },
        enumerable: true,
        configurable: true
    });
    return Element;
}());
exports.Element = Element;
//# sourceMappingURL=Element.js.map