import {Component, OnInit, HostListener, Inject, forwardRef, Optional} from '@angular/core';
import {BaseElement} from "./element";
import {MapService} from "../../shared/services/map.service";
import {GameMapComponent} from "./game-map.component";


@Component({
    moduleId: module.id,
    selector: 'decoration',
    templateUrl: '../templates/decoration.component.html',
})
export class DecorationComponent extends BaseElement implements OnInit {

    constructor(protected mapService: MapService, @Optional() @Inject(forwardRef(() =>  GameMapComponent)) protected gameMap: GameMapComponent) {
        super();
    }

    setSelectedType() {
        this.mapService.selectedType = "decoration";
    }

    ngOnInit() { }


}