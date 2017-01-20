"use strict";
// The browser platform with a compiler
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// The app module
var app_module_1 = require("./app.module");
var core_1 = require("@angular/core");
// Compile and launch the module
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map