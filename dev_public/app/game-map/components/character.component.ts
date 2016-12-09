import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {BaseElement} from "./element";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";


@Component({
    moduleId: module.id,
    selector: 'character',
    templateUrl: '../templates/character.component.html',
    styleUrls: ['../css/character.component.min.css'],
})
export class CharacterComponent extends BaseElement implements OnInit {
    constructor(protected mapService: MapService, @Inject(forwardRef(() =>  GameMapComponent)) protected gameMap: GameMapComponent) {
        super();
    }

    setSelectedType() {
        this.mapService.selectedType = "character";
    }

    ngOnInit() {

    }

}


