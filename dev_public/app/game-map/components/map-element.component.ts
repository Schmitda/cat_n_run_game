import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {BaseElement} from "./element";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";


@Component({
    moduleId: module.id,
    selector: 'map-element',
    templateUrl: '../templates/map-element.component.html',
    styleUrls: ['../css/map-element.component.min.css'],
})
export class MapElementComponent extends BaseElement implements OnInit {

    constructor(protected mapService: MapService, @Inject(forwardRef(() =>  GameMapComponent)) protected gameMap: GameMapComponent) {
        super();
    }

    setSelectedType() {
        this.mapService.selectedType = "mapElement";
    }

    ngOnInit() {

    }

}


