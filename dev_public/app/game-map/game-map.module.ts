import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.modules";
import {routing, gameMapRouting} from "./game-map.routing";
import {SharedModule} from "../shared/shared.module";
import {GameMapComponent} from "./components/game-map.component";
import {DecorationComponent} from "./components/decoration.component";
import {MapLoadModalComponent} from "./components/map-load-modal.component";
import {CharacterComponent} from "./components/character.component";
import {MapElementComponent} from "./components/map-element.component";
import {CollectibleComponent} from "./components/collectible.component";



@NgModule({
    imports: [ gameMapRouting, SharedModule ],
    providers: [],
    declarations: [  GameMapComponent, DecorationComponent, MapLoadModalComponent, CharacterComponent, MapElementComponent, CollectibleComponent ],
    exports: []
})
export class GameMapModule { }
