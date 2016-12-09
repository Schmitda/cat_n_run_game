import { Injectable } from '@angular/core';
import {CharacterComponent} from "../components/character.component";

@Injectable()
export class CharacterService {
    private _isWalking: boolean = false;
    private _speed: number = 0;
    private _live: number = 2;
    private direction: string = "right";
    private startMovingTime: Date;
    private endMovingTime: Date;
    private accelerationTime: number = 3000;
    private characterComponent: CharacterComponent;
    private lastPictureChange: Date;

    constructor() {

    }

    public startMovingRight(){
        if(this.isWalking == false || this.direction !== "right"){
            this.direction = "right";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    }

    public startMovingLeft() {
        if(this.isWalking == false || this.direction !== "left"){
            this.direction = "left";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    }

    public accelerate(){
        if(this.isWalking){
            let date = new Date();
            this.speed = (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10  > 1 ? 1 : (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10;
        }
    }

    public moveCharacter(){
        if(this.lastPictureChange == undefined){
            this.lastPictureChange = new Date();
        }
        if(this.characterComponent){
            if(this.direction == "right" && this.isWalking){
                this.characterComponent.xCoord = this.characterComponent.xCoord + (10 * this.speed);
                this.characterComponent.rotate = false;
            }else if(this.direction == "left" && this.isWalking){
                this.characterComponent.rotate = true;
                this.characterComponent.xCoord = this.characterComponent.xCoord - (10 * this.speed);
            }
        }
        if(this.isWalking){
            let date = new Date();
            if(date.getTime() - this.lastPictureChange.getTime() > 33){
                this.lastPictureChange = date;
                if(this.characterComponent.element.walkAnimation.length -1 > this.characterComponent.imageNumber){
                    this.characterComponent.imageNumber++;
                }else{
                    this.characterComponent.imageNumber = 0;
                }
            }
        }else{
            this.characterComponent.imageNumber = 0;
        }
    }

    public setCharacterComponent(characterComponent: CharacterComponent) {
        this.characterComponent = characterComponent;
    }

    public keyReleased(){
        this.isWalking = false;
        this.endMovingTime = new Date();
    }

    get isWalking(): boolean {
        return this._isWalking;
    }

    set isWalking(value: boolean) {
        this._isWalking = value;
    }

    get speed(): any {
        return this._speed;
    }

    set speed(value: any) {
        this._speed = value;
    }

    get live(): any {
        return this._live;
    }

    set live(value: any) {
        this._live = value;
    }
}