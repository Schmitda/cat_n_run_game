import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';
import {MapService} from "../shared/services/map.service";
import {MapCreator} from "../shared/services/map-creator.service";

@NgModule({
    imports:      [ CommonModule ],
  /*  declarations: [ TitleComponent ],
    exports:      [ TitleComponent ],*/
    providers:    [ MapService, MapCreator]
})
export class CoreModule {
}