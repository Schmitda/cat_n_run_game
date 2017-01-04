import {Component, OnInit, forwardRef, Inject, SimpleChange} from '@angular/core';
import {BaseElement} from "./element";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";
import {MapRepresentationService} from "../../shared/services/map-representation.service";
import {Observable} from "rxjs/Rx";


@Component({
    moduleId: module.id,
    selector: 'map-element',
    templateUrl: '../templates/map-element.component.html',
    styleUrls: ['../css/map-element.component.min.css'],
})
export class MapElementComponent extends BaseElement implements OnInit {


    constructor(protected mapService: MapService, @Inject(forwardRef(() =>  GameMapComponent)) protected gameMap: GameMapComponent, private mapRepresentationService: MapRepresentationService) {
        super();
        mapRepresentationService.tookMeasure.subscribe((ratio)=>{
            /*this.shrinkFactor = 1.5;
            this.xCoord = ratio.playgroundWidth / 100 * this.element.xRatio;
            this.yCoord = ratio.playgroundHeight / 100 * this.element.yRatio;*/
            this.ratio = ratio;
        })
    }

    ngOnChanges(change: SimpleChange){
        if(change.element && change.element.currentValue){

        }
    }

    setSelectedType() {
        this.mapService.selectedType = "mapElement";
    }

    ngOnInit() {

    }

}


