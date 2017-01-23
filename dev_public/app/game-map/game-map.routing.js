"use strict";
var router_1 = require('@angular/router');
var game_map_component_1 = require("./components/game-map.component");
exports.routes = [
    { path: '', pathMatch: 'full', component: game_map_component_1.GameMapComponent },
];
exports.gameMapRouting = router_1.RouterModule.forChild(exports.routes);
//# sourceMappingURL=game-map.routing.js.map