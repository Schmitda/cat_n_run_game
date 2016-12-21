import {Injectable} from '@angular/core';
import {CharacterComponent} from "../components/character.component";
import {MapCreator} from "../../shared/services/map-creator.service";
import {GameMapComponent} from "../components/game-map.component";
import {MapRepresentationService} from "../../shared/services/map-representation.service";

@Injectable()
export class CharacterService {
    private _isWalking: boolean = false;
    private _speed: number = 0;
    private _live: number = 2;
    private direction: string = "right";
    private startMovingTime: Date;
    private gravity = 9.81;
    private endMovingTime: Date;
    private initalGravity: number = 9.81;
    private jumpStart: Date;
    private jumpMaxDuration: number = 0.3;
    private accelerationTime: number = 3000;
    private characterComponent: CharacterComponent;
    private lastPictureChange: Date;
    private isJumping: boolean = false;
    private isFalling: boolean = false;
    private _gameMape: GameMapComponent;
    hasMoved: boolean;

    constructor(private mapRepresentationService: MapRepresentationService) {

    }

    public startMovingRight() {
        if (this.isWalking == false || this.direction !== "right") {
            this.direction = "right";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    }

    public startMovingLeft() {
        if (this.isWalking == false || this.direction !== "left") {
            this.direction = "left";
            this.startMovingTime = new Date();
            this.isWalking = true;
        }
    }

    public startJumping() {
        let xYPosition = this.getXYPosition();
        if (this.isJumping == false) {
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == true) {
                console.log(this);
                this.isJumping = true;
                this.gravity = 0;
                this.jumpStart = new Date();
            } else {
                this.gravity = this.initalGravity;
                this.isJumping = false;
            }
        }
    }

    private checkJumping() {
        let date = new Date();

        if (this.isJumping && (date.getTime() - this.jumpStart.getTime()) / 1000 > this.jumpMaxDuration) {
            this.isJumping = false;
            this.gravity = this.initalGravity;
        }

        /*   if(date.getTime() - this.jumpStart.getTime() / 1000 > this.jumpMaxDuration /2){
         this.isFalling = true;
         }*/
    }

    public accelerate() {
        if (this.isWalking) {
            let date = new Date();
            this.speed = (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10 > 1 ? 1 : (date.getTime() - this.startMovingTime.getTime()) / this.accelerationTime * 10;
        }
    }

    public moveCharacter() {
        this.checkJumping();
        if (this.lastPictureChange == undefined) {
            this.lastPictureChange = new Date();
        }
        if (this.characterComponent) {
            if (this.direction == "right" && this.isWalking) {
                this.characterComponent.xCoord = this.characterComponent.xCoord + (10 * this.speed);
                this.characterComponent.rotate = false;
                if (this.isJumping) {
                    this.characterComponent.yCoord = this.characterComponent.yCoord - (10 * this.speed);
                }
            } else if (this.direction == "left" && this.isWalking) {
                this.characterComponent.rotate = true;
                this.characterComponent.xCoord = this.characterComponent.xCoord - (10 * this.speed);
                if (this.isJumping) {
                    this.characterComponent.yCoord = this.characterComponent.yCoord - (10 * this.speed);
                }
            }
        }
        if (this.isWalking) {
            let date = new Date();
            if (date.getTime() - this.lastPictureChange.getTime() > 33) {
                this.lastPictureChange = date;
                if (this.characterComponent.element.walkAnimation.length - 1 > this.characterComponent.imageNumber) {
                    this.characterComponent.imageNumber++;
                } else {
                    this.characterComponent.imageNumber = 0;
                }
            }
        } else {
            this.characterComponent.imageNumber = 0;
        }
    }

    public checkIfMoved() {
        if (this.isWalking) {
            this.hasMoved = true;
        } else {
            this.hasMoved = false;
        }
    }

    public setCharacterComponent(characterComponent: CharacterComponent) {
        this.characterComponent = characterComponent;
    }

    private getXYPosition() {
        let rectangle = this.characterComponent.imgElement.nativeElement.getBoundingClientRect();
        let x = rectangle.left + rectangle.width / 2;
        let y = rectangle.bottom;
        return {x: x, y: y}
    }

    public processGravity() {
        /*if (this.hasMoved) {*/
        let date = new Date();
        let xYPosition = this.getXYPosition();
        if (this.gravity > 0) {

            //TODO check cat is on element function
            console.log(this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y));
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == false) {

                let xYPosition = this.getXYPosition();
                let element = this.mapRepresentationService.isInMapElementAndGetElement(xYPosition.x, xYPosition.y + 1);
                this.characterComponent.yCoord = this.characterComponent.yCoord + (this.gravity * 0.5);
                if (element) {
                    if (this.mapRepresentationService.isInTopBorder(xYPosition.y, element)) {
                        this.characterComponent.yCoord = element.yCoord - this.characterComponent.element.height + 45;
                    }
                    /*else{
                     this.characterComponent.yCoord = this.characterComponent.yCoord + (this.gravity * 0.5);
                     }*/
                }
            }
        }
        /*}*/
    }

    public keyReleased() {
        this.isWalking = false;
        this.endMovingTime = new Date();
    }

    get isWalking(): boolean {
        return this._isWalking;
    }

    set isWalking(value: boolean) {
        this._isWalking = value;
    }

    set gameMape(value: GameMapComponent) {
        this._gameMape = value;
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