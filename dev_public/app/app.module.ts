import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.modules";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {MapLoadModalComponent} from "./game-map/components/map-load-modal.component";



@NgModule({
    imports: [ CoreModule, routing, HttpModule, BrowserModule ],
    declarations: [ AppComponent, MapLoadModalComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
