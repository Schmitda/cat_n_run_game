"use strict";
var Modal = (function () {
    function Modal() {
        this.isVisible = false;
    }
    Modal.prototype.show = function () {
        this.isVisible = true;
    };
    Modal.prototype.hide = function () {
        this.isVisible = false;
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map