import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full'},
    { path: 'game', loadChildren: 'app/game-map/game-map.module#GameMapModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
