import { Injectable } from '@angular/core';
import {MapLoadModalComponent} from "../components/map-load-modal.component";

@Injectable()
export class MapLoadService {

    private _mapLoadComponent: MapLoadModalComponent;

    constructor() { }


    get mapLoadComponent(): MapLoadModalComponent {
        return this._mapLoadComponent;
    }

    set mapLoadComponent(value: MapLoadModalComponent) {
        this._mapLoadComponent = value;
    }
}