"use strict";
var router_1 = require("@angular/router");
exports.routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    { path: 'game', loadChildren: 'app/game-map/game-map.module#GameMapModule' },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map