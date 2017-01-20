import {Injectable, Inject, forwardRef} from '@angular/core';
import {GameMapComponent} from "../../game-map/components/game-map.component";
import {MapElementComponent} from "../../game-map/components/map-element.component";
import {BaseElement} from "../../game-map/components/element";
import {CharacterService} from "../../game-map/services/character.service";
import {CollectibleComponent} from "../../game-map/components/collectible.component";
import {CharacterComponent} from "../../game-map/components/character.component";
import {BehaviorSubject, Subject} from "rxjs/Rx";

@Injectable()
export class MapRepresentationService {
    private _gameMap: GameMapComponent;
    private _characterService: CharacterService;
    private _playgroundWidth: number;
    private _playgroundHeight: number;
    private _playgroundRatio: number;
    private _defaultWidth: number = 1920 - 400;
    private _defaultHeight: number = 924;
    private _defaultRatio: number = 1.645;
    private _tookMeasure: BehaviorSubject<{defaultWidth: number, defaultHeight: number, defaultRatio: number, playgroundWidth: number, playgroundHeight: number, playgroundRatio: number}> = new BehaviorSubject(null);

    constructor() {
    }

    public scrollBody() {
        if (this._characterService) {
            let xYPosition = this._characterService.getXYPosition();
            let screenWidth = document.documentElement.clientWidth * this.gameMap.reverseZoom();
            let screenHeight = document.documentElement.clientHeight * this.gameMap.reverseZoom();
            if (xYPosition.x > screenWidth / 2) {
                let middlePoint = (Math.abs(document.body.getBoundingClientRect()['width'] / 2  + document.body.scrollLeft)  /** this.gameMap.zoom*/;
                let x = xYPosition.x * this.gameMap.zoom;
                let difference = x - middlePoint;
                if(difference > 1 ||  difference < -1) {
                    document.body.scrollLeft += difference;
                }
            }else{
                document.body.scrollLeft = 0;
            }
        }
    }

    private isTouching(baseElementOne: BaseElement, baseElementTwo: BaseElement) {
        let tc = baseElementOne.yCoord;
        let bc = baseElementOne.yCoord + baseElementOne.element.height;
        let lc = baseElementOne.xCoord;
        let rc = baseElementOne.xCoord + baseElementOne.element.width;

        let te = baseElementTwo.yCoord;
        let be = baseElementTwo.yCoord + baseElementTwo.element.height;
        let le = baseElementTwo.xCoord;
        let re = baseElementTwo.xCoord + baseElementTwo.element.width;


        if (bc >= te && lc <= le && tc <= te && rc >= le) return true;
        if (bc >= te && lc <= re && tc <= le && rc >= re) return true;
        if (bc >= be && lc <= le && tc <= be && rc >= le) return true;
        if (bc >= be && lc <= re && tc <= be && rc >= re) return true;

        return false;
    }

    private isIn(x: number, y: number, elementToCheck: BaseElement) {
        let isInXElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        let isInYElement = (y > elementToCheck.yCoord && elementToCheck.yCoord + elementToCheck.element.height < y);
        return isInXElement && isInYElement;
    }

    private isOn(x: number, y: number, elementToCheck: BaseElement) {
        let isXOnElement = (elementToCheck.xCoord + elementToCheck.element.width > x && elementToCheck.xCoord < x);
        let isYOnElement = (y >= elementToCheck.yCoord + 20 && y < elementToCheck.yCoord + 45 + 20);
        return isXOnElement && isYOnElement;
    }

    public isInTopBorder(y: number, element: BaseElement) {
        return (element.yCoord + 45 + 20 > y && element.yCoord < y);
    }

    public checkIfCatIsOnElement(x: number, y: number): boolean {
        let foundElementCatIsOn = false;
        this.gameMap.mapElementComponents.forEach((mapElementComponent) => {
            if (this.isOn(x, y, mapElementComponent)) {
                foundElementCatIsOn = true;
            }
        });
        return foundElementCatIsOn;


    }

    public getCollectibleCatTouches(): CollectibleComponent|boolean {
        let xYPosition = this.characterService.getXYPosition();
        for (let collectible of this.gameMap.collectibleComponents.toArray()) {
            if (this.isTouching(this.characterService.characterComponent, collectible)) {
                console.log("touchy touchy");
                return collectible;
            }
        }
        return false;
    }

    public isInMapElementAndGetElement(x: number, y: number): BaseElement|boolean {
        let foundIsInMapElement: BaseElement|boolean = false;
        this.gameMap.mapElementComponents.forEach((mapElementComponent) => {
            if (this.isIn(x, y, mapElementComponent)) {
                foundIsInMapElement = mapElementComponent;
            }
        });
        return foundIsInMapElement;
    }

    get characterService(): CharacterService {
        return this._characterService;
    }

    set characterService(value: CharacterService) {
        this._characterService = value;
    }

    get gameMap(): GameMapComponent {
        return this._gameMap;
    }

    private takeMeasure() {
        this._playgroundWidth = document.documentElement.clientWidth;
        this._playgroundHeight = this.gameMap.mapElement.nativeElement.getBoundingClientRect()['height'];
        this._playgroundRatio = this._playgroundWidth / this._playgroundHeight;
        this._tookMeasure.next(
            {
                defaultHeight: this._defaultHeight,
                defaultWidth: this._defaultWidth,
                defaultRatio: this._defaultRatio,
                playgroundWidth: this._playgroundWidth,
                playgroundHeight: this._playgroundHeight,
                playgroundRatio: this._playgroundRatio,
            }
        )
    }

    set gameMap(value: GameMapComponent) {
        this._gameMap = value;
        this.takeMeasure();
    }


    get tookMeasure(): BehaviorSubject<{defaultWidth: number; defaultHeight: number; defaultRatio: number; playgroundWidth: number; playgroundHeight: number; playgroundRatio: number}> {
        return this._tookMeasure;
    }

    set tookMeasure(value: BehaviorSubject<{defaultWidth: number; defaultHeight: number; defaultRatio: number; playgroundWidth: number; playgroundHeight: number; playgroundRatio: number}>) {
        this._tookMeasure = value;
    }
}