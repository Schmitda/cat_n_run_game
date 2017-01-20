import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';
import {MapService} from "../shared/services/map.service";
import {MapCreator} from "../shared/services/map-creator.service";
import {MapRepresentationService} from "../shared/services/map-representation.service";
import {MapLoadService} from "../game-map/services/map-load.service";

@NgModule({
    imports:      [ CommonModule ],
  /*  declarations: [ TitleComponent ],
    exports:      [ TitleComponent ],*/
    providers:    [ MapService, MapCreator, MapRepresentationService, MapLoadService]
})
export class CoreModule {
}