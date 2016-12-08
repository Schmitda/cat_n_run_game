import {Component, OnInit} from '@angular/core';
import {Modal} from "../../shared/components/Modal";
import {MapService} from "../../shared/services/map.service";
import {MapCreator} from "../../shared/services/map-creator.service";

@Component({
    moduleId: module.id,
    selector: 'map-load-modal',
    templateUrl: '../templates/map-load-modal.component.html',
    styleUrls: ['../css/map-load-modal.component.min.css'],
})
export class MapLoadModalComponent extends Modal implements OnInit {
    private maps: any[];

    constructor(private mapService: MapService, private mapCreator: MapCreator) {
        super();
        this.mapService.getAll().subscribe((results) => {
            this.maps = results;
        })
    }

    private loadMap(map:any){
        this.mapCreator.loadMap(map);
        this.hide();
    }

    ngOnInit() {

    }

}


