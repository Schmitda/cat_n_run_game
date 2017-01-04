import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild, HostBinding, HostListener, ElementRef} from '@angular/core';
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
    @HostBinding('style.zoom') zoom: number = 1;
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

        if(this.pause == false && this.gameOver == false){
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
    private _gameOver: boolean = false;
    private isRunning: boolean = false;
    private _hasWon: boolean = false;
    private loadAnotherMap: boolean = false;
    private lastFPSCheckDate: Date;
    private fps: number = 0;


    constructor(private mapService: MapService, private mapCreator: MapCreator,private characterService: CharacterService, private mapRepresentationService: MapRepresentationService, public mapElement: ElementRef) {
        this.characterService.gameMap = this;
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.reinitializeGame();
                this.setBackground();
                this.zoom = 1 / (924 / document.documentElement.clientHeight);
            }
        });

        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.gameLoop();
            }
        })
    }

    private calculateZoom(){
        this.zoom = 1 / (924 / document.documentElement.clientHeight);
    }

    private reinitializeGame(){
        this.characterService.live = 2;
        document.body.scrollLeft = 0;
        this.gameOver = false;
        this.pause = false;
        this.hasWon = false;
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
        this.zoom = 1;
        this.isRunning = false;
    }

    private gameLoop(){
        if(this.isRunning == false){
            this.calculateZoom();
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
            this.processMap();
        }
    }

    public reverseZoom():number{
        return 1 / this.zoom;
    }

    private processMap(){
        this.mapRepresentationService.scrollBody();
    }

    private processGravity(){
        this.characterService.processGravity();
    }

    private processCharacter(){
        this.characterService.accelerate();
        this.characterService.moveCharacter();
        this.characterService.checkPosition();
        this.characterService.checkLive();
    }

    public playerHasWon() {
        this.hasWon = true;
        this.stopGame();
        setTimeout(()=> {
            this.mapLoadModal.show();
        }, 3000)
    }

    ngAfterViewInit(): void {
        this.mapRepresentationService.gameMap = this;
        this.mapLoadModal.show();
    }

    ngOnInit() {

    }

    public setBackground() {
        this.backgroundImage = 'url(http://localhost:55/' + this.mapCreator.background.source + ')';
    }

    get hasWon(): boolean {
        return this._hasWon;
    }

    set hasWon(value: boolean) {
        this._hasWon = value;
    }

    get gameOver(): boolean {
        return this._gameOver;
    }

    set gameOver(value: boolean) {
        this._gameOver = value;
    }

    get playgroundWidth(): number {
        return this._playgroundWidth;
    }

    set playgroundWidth(value: number) {
        this._playgroundWidth = value;
    }

    get playgroundHeight(): number {
        return this._playgroundHeight;
    }

    set playgroundHeight(value: number) {
        this._playgroundHeight = value;
    }

    get playgroundRation(): number {
        return this._playgroundRation;
    }

    set playgroundRation(value: number) {
        this._playgroundRation = value;
    }

    get defaultWidth(): number {
        return this._defaultWidth;
    }

    set defaultWidth(value: number) {
        this._defaultWidth = value;
    }

    get defaultHeight(): number {
        return this._defaultHeight;
    }

    set defaultHeight(value: number) {
        this._defaultHeight = value;
    }

    get defaultRatio(): number {
        return this._defaultRatio;
    }

    set defaultRatio(value: number) {
        this._defaultRatio = value;
    }
}


