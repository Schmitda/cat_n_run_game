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
import {MapLoadService} from "../services/map-load.service";

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
    @HostBinding('style.background-image') backgroundImage: string = '';
    /*@HostBinding('style.transform') scale: string = 'scale(1)';*/
    @HostBinding('style.zoom') zoom:number = 1;
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent){
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
                    this.mapLoadService.mapLoadComponent.show();
                }else{
                    this.loadAnotherMap = false;
                    this.mapLoadService.mapLoadComponent.hide();
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


    @HostListener('window:resize', ['$event']) onResize(event){
        this.pauseAndStopGame();
    }

    @HostListener('window:orientationchange' , ['$event']) onOrientationChange(event){
        this.pauseAndStopGame();
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

    @HostListener('touchstart', ['$event'])
    onTouchStart(event:TouchEvent){
        if(new Date().getTime() - this.touchStart.getTime() < 300){
            this.pause = !this.pause;
            if(this.pause == false){
                this.gameLoop();
            }else{
                this.stopGame();
            }
        }else{
            this.touchStart = new Date();
            this.touchStartX = event.touches[0].pageX;
            this.touchStartY = event.touches[0].pageY;
        }
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event:TouchEvent)
    {
        let currentX = event.touches[0].pageX;
        let currentY = event.touches[0].pageY;
        if(this.touchStartY - currentY > this.touchTolerance){
            this.characterService.startJumping();
        }

        if(currentX - this.touchStartX > this.touchTolerance){
            this.characterService.startMovingRight();
        }else if(currentX - this.touchStartX < -this.touchTolerance){
            this.characterService.startMovingLeft();
        }

        event.preventDefault();
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(event){
        this.scrollLeft = document.body.scrollLeft;
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event:TouchEvent){
        this.characterService.keyReleased();
    }

    private gameLoopInterval: any;
    private loopBeginning: Date;
    private touchTolerance:number = 100;
    private pause: boolean = false;
    private _gameOver: boolean = false;
    private isRunning: boolean = false;
    private _hasWon: boolean = false;
    private loadAnotherMap: boolean = false;
    private touchStart: Date = new Date();
    private lastFPSCheckDate: Date;
    private fps: number = 0;
    private touchStartX: number;
    private touchStartY: number;
    private scrollLeft: number;
    private clientWidth: number;
    private clientHeight: number;
    private isMobile: boolean = false;


    constructor(private mapService: MapService, private mapCreator: MapCreator,private characterService: CharacterService, private mapRepresentationService: MapRepresentationService, public mapElement: ElementRef, private mapLoadService: MapLoadService) {
        this.characterService.gameMap = this;
        this.checkIsMobile();
        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.reinitializeGame();
                this.setBackground();
                this.calculateZoom();
            }
        });

        this.mapCreator.mapLoaded.subscribe((value) => {
            if(value){
                this.gameLoop();
            }
        })
    }

    private checkIsMobile(){
        ((a)=>{if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) this.isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
    }

    private calcLeft(){
        if(this.isMobile){
            return this.scrollLeft * this.reverseZoom() + 'px'
        }
    }


    private pauseAndStopGame(){
        this.pause = true;
        this.stopGame();
    }

    private calculateZoom(){
        this.zoom = 1 / (924 / document.documentElement.clientHeight);
        this.clientWidth = document.documentElement.clientWidth * this.reverseZoom();
        this.clientHeight = document.documentElement.clientHeight * this.reverseZoom();
        this.scale = 'scale('+this.zoom+')';
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
            this.mapLoadService.mapLoadComponent.show();
        }, 3000)
    }

    ngAfterViewInit(): void {
        this.mapRepresentationService.gameMap = this;
        this.mapLoadService.mapLoadComponent.show();
    }

    ngOnInit() {

    }

    public setBackground() {
        this.backgroundImage = 'url(http://schmitz-dynamics.ch:55/' + this.mapCreator.background.source + ')';
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
        if(value == true){
            setTimeout(()=>{
                this.mapLoadService.mapLoadComponent.show();
            }, 4000)
        }
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


