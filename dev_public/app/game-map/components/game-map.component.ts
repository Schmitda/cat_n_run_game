import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild, HostBinding, HostListener} from '@angular/core';
import {DecorationComponent} from "./decoration.component";
import {MapService} from "../../shared/services/map.service";
import {MapCreator} from "../../shared/services/map-creator.service";
import {MapLoadModalComponent} from "./map-load-modal.component";
import {CollectibleComponent} from "./collectible.component";
import {MapElementComponent} from "./map-element.component";
import {CharacterComponent} from "./character.component";
import {CharacterService} from "../services/character.service";
import {MapRepresentationService} from "../../shared/services/map-representation.service";

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
        console.log(event.keyCode);
        switch(event.keyCode){
            case 27:{
                this.pause = !this.pause;
                if(this.pause == false){
                    this.gameLoop();
                }else{
                    this.stopGame();
                }
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
            case 32:{
                if(this.pause == false){
                    this.characterService.startJumping();
                }
                break;
            }
        }

        if(this.pause == false){
            switch (event.keyCode){
                case 39:{
                    this.characterService.startMovingRight();
                    event.stopPropagation();
                    event.preventDefault();
                    break;
                }
                case 37:{
                    this.characterService.startMovingLeft();
                    event.stopPropagation();
                    event.preventDefault();
                    break;
                }
            }
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent){
        switch (event.keyCode) {
            case 39: {
                this.characterService.keyReleased();
                break;
            }
            case 37: {
                this.characterService.keyReleased();
                break;
            }
        }
    }

    private gameLoopInterval: any;
    private loopBeginning: Date;
    private pause: boolean = false;
    private isRunning: boolean = false;
    private loadAnotherMap: boolean = false;
    private lastFPSCheckDate: Date;
    private fps: number = 0;

    constructor(private mapService: MapService, private mapCreator: MapCreator,private characterService: CharacterService, private mapRepresentationService: MapRepresentationService) {
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.setBackground();
            }
        });
        this.mapRepresentationService.gameMap = this;
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.gameLoop();
            }
        })
    }

    private calculateFPS(){
        if(this.lastFPSCheckDate === undefined){
            this.lastFPSCheckDate = new Date();
        }
        this.fps = Math.ceil(1000 / (this.loopBeginning.getTime() - this.lastFPSCheckDate.getTime()));
        this.lastFPSCheckDate = this.loopBeginning;

    }

    private stopGame(){
        clearInterval(this.gameLoopInterval);
        this.isRunning = false;
    }

    private gameLoop(){
        if(this.isRunning == false){
            this.isRunning = true;
            this.gameLoopInterval = setInterval(()=> {
                this.gameLoop();
            },16.6666 )
        }else{
            this.loopBeginning = new Date();
            this.calculateFPS();
            this.processCharacter();
            this.characterService.checkIfMoved();
            this.processGravity();
        }
    }

    private processGravity(){
        this.characterService.processGravity();
    }

    private processCharacter(){
        this.characterService.accelerate();
        this.characterService.moveCharacter();
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


