import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {GameMapComponent} from "./components/game-map.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: GameMapComponent},
];

export const gameMapRouting: ModuleWithProviders = RouterModule.forChild(routes);
