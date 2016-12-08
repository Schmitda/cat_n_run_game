import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild, HostBinding} from '@angular/core';
import {DecorationComponent} from "./decoration.component";
import {MapService} from "../../shared/services/map.service";
import {MapCreator} from "../../shared/services/map-creator.service";
import {MapLoadModalComponent} from "./map-load-modal.component";

@Component({
    moduleId: module.id,
    selector: '',
    templateUrl: '../templates/game-map.component.html',
    styleUrls: ['../css/game-map.component.min.css'],
})
export class GameMapComponent implements OnInit, AfterViewInit {
    @ViewChildren(DecorationComponent) decorationComponents: QueryList<DecorationComponent>;
    @ViewChild(MapLoadModalComponent) mapLoadModal: MapLoadModalComponent;
    @HostBinding('style.background-image') backgroundImage: string = '';

    constructor(private mapService: MapService, private mapCreator: MapCreator) {
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.setBackground();
            }
        })
    }


    ngAfterViewInit(): void {
        this.mapLoadModal.show();
    }

    ngOnInit() {

    }

    public setBackground() {
        this.backgroundImage = 'url(http://localhost:55/' + this.mapCreator.background.source + ')';
        console.log('url(http://localhost:55/' + this.mapCreator.background.source + ')');
    }

}


