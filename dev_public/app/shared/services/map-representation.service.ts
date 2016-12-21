import { Injectable } from '@angular/core';
import {GameMapComponent} from "../../game-map/components/game-map.component";
import {MapElementComponent} from "../../game-map/components/map-element.component";
import {BaseElement} from "../../game-map/components/element";

@Injectable()
export class MapRepresentationService {
    private _gameMap: GameMapComponent;

    constructor() { }

    get gameMap(): GameMapComponent {
        return this._gameMap;
    }

    set gameMap(value: GameMapComponent) {
        this._gameMap = value;
    }

    private isIn(x:number,y:number,elementToCheck: BaseElement){
        let isInXElement = (elementToCheck.xCoord + elementToCheck.element.width > x  && elementToCheck.xCoord < x);
        let isInYElement = (elementToCheck.yCoord < y  && elementToCheck.yCoord - elementToCheck.element.height < y);
        return isInXElement && isInYElement;
    }

    private isOn(x:number,y:number,elementToCheck:BaseElement){
        let isXOnElement = (elementToCheck.xCoord + elementToCheck.element.width > x  && elementToCheck.xCoord < x);
        let isYOnElement = (elementToCheck.yCoord >= y  && elementToCheck.yCoord + 1 > y);
        return isXOnElement && isYOnElement;
    }

    public isInTopBorder(y:number, element:BaseElement){
        console.log(y);
        console.log(element.yCoord);

        return (element.yCoord + 45 + 20 > y && element.yCoord < y);
    }

    public checkIfCatIsOnElement(x: number, y: number):boolean {
        let foundElementCatIsOn = false;
        this.gameMap.mapElementComponents.forEach((mapElementComponent) => {
            if(this.isOn(x,y,mapElementComponent)){
                foundElementCatIsOn = true;
            };
        });
        return !foundElementCatIsOn;
    }

    public isInMapElementAndGetElement(x:number,y:number):BaseElement|boolean{
        let foundIsInMapElement:BaseElement|boolean = false;
        this.gameMap.mapElementComponents.forEach((mapElementComponent) => {
            if(this.isIn(x,y,mapElementComponent)){
                foundIsInMapElement = mapElementComponent;
            }
        });
        return foundIsInMapElement;
    }
}