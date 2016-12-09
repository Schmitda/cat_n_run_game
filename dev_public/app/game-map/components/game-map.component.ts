import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild, HostBinding, HostListener} from '@angular/core';
import {DecorationComponent} from "./decoration.component";
import {MapService} from "../../shared/services/map.service";
import {MapCreator} from "../../shared/services/map-creator.service";
import {MapLoadModalComponent} from "./map-load-modal.component";
import {CollectibleComponent} from "./collectible.component";
import {MapElementComponent} from "./map-element.component";
import {CharacterComponent} from "./character.component";

@Component({
    moduleId: module.id,
    selector: '',
    templateUrl: '../templates/game-map.component.html',
    styleUrls: ['../css/game-map.component.min.css'],
})
export class GameMapComponent implements OnInit, AfterViewInit {
    @ViewChildren(DecorationComponent) decorationComponents: QueryList<DecorationComponent>;
    @ViewChildren(CollectibleComponent) collectibleComponents: QueryList<CollectibleComponent>;
    @ViewChildren(MapElementComponent) mapElementComponents: QueryList<MapElementComponent>;
    @ViewChildren(CharacterComponent) characterComponents: QueryList<CharacterComponent>;
    @ViewChild(MapLoadModalComponent) mapLoadModal: MapLoadModalComponent;
    @HostBinding('style.background-image') backgroundImage: string = '';
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent){
        console.log(event);
        switch(event.keyCode){
            case 27:{
                this.pause = !this.pause;
                break;
            }
            case 13:{
                if(this.loadAnotherMap == false){
                    this.pause = true;
                    this.loadAnotherMap = true;
                    this.mapLoadModal.show();
                }else{
                    this.loadAnotherMap = false;
                    this.mapLoadModal.hide();
                    this.pause = false;
                }
                break;
            }
        }
    }


    private loopBeginning: Date;
    private pause: boolean = false;
    private loadAnotherMap: boolean = false;

    constructor(private mapService: MapService, private mapCreator: MapCreator) {
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.setBackground();
            }
        })
    }

    private gameLoop(){

    }

    ngAfterViewInit(): void {
        this.mapLoadModal.show();
        this.gameLoop();
    }

    ngOnInit() {

    }

    public setBackground() {
        this.backgroundImage = 'url(http://localhost:55/' + this.mapCreator.background.source + ')';
        console.log('url(http://localhost:55/' + this.mapCreator.background.source + ')');
    }

}


