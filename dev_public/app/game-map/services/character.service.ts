import {Injectable} from '@angular/core';
import {CharacterComponent} from "../components/character.component";
import {MapCreator} from "../../shared/services/map-creator.service";
import {GameMapComponent} from "../components/game-map.component";
import {MapRepresentationService} from "../../shared/services/map-representation.service";
import {CollectibleComponent} from "../components/collectible.component";

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
    private _characterComponent: CharacterComponent;
    private lastPictureChange: Date;
    private isJumping: boolean = false;
    private isFalling: boolean = false;
    private _gameMap: GameMapComponent;
    hasMoved: boolean;

    constructor(private mapRepresentationService: MapRepresentationService) {
        this.mapRepresentationService.characterService = this;
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
        if (this._characterComponent) {
            if (this.direction == "right" && this.isWalking) {
                this._characterComponent.xCoord = this._characterComponent.xCoord + (10 * this.speed);
                this._characterComponent.rotate = false;
                if (this.isJumping) {
                    this._characterComponent.yCoord = this._characterComponent.yCoord - (10 * this.speed);
                }
            } else if (this.direction == "left" && this.isWalking) {
                this._characterComponent.rotate = true;
                this._characterComponent.xCoord = this._characterComponent.xCoord - (10 * this.speed);
                if (this.isJumping) {
                    this._characterComponent.yCoord = this._characterComponent.yCoord - (10 * this.speed);
                }
            }
        }
        if (this.isWalking) {
            let date = new Date();
            if (date.getTime() - this.lastPictureChange.getTime() > 33) {
                this.lastPictureChange = date;
                if (this._characterComponent.element.walkAnimation.length - 1 > this._characterComponent.imageNumber) {
                    this._characterComponent.imageNumber++;
                } else {
                    this._characterComponent.imageNumber = 0;
                }
            }
        } else {
            this._characterComponent.imageNumber = 0;
        }
    }

    public checkPosition() {
        if (this.getXYPosition().y > document.documentElement.clientHeight * (1 / this.gameMap.zoom)) {
            this.live = 0;
        }
        let collectible: CollectibleComponent|boolean = this.mapRepresentationService.getCollectibleCatTouches();
        console.log(collectible);
        if (collectible) {
            if (collectible.element.reward == 'winningPoint') {
                this.gameMap.playerHasWon();
            }
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
        this._characterComponent = characterComponent;
    }

    public getXYPosition() {
        let rectangle = this._characterComponent.imgElement.nativeElement.getBoundingClientRect();
        let x = Math.abs(document.body.getClientRects()[0].left * this.gameMap.reverseZoom()) + rectangle.left + rectangle.width / 2;
        let y = rectangle.bottom;
        return {x: x, y: y}
    }

    public processGravity() {
        let date = new Date();
        let xYPosition = this.getXYPosition();
        if (this.gravity > 0) {
            //TODO check cat is on element function
            if (this.mapRepresentationService.checkIfCatIsOnElement(xYPosition.x, xYPosition.y) == false) {
                let xYPosition = this.getXYPosition();
                this._characterComponent.yCoord = this._characterComponent.yCoord + (this.gravity * 0.5);
            }
        }
    }

    public checkLive() {
        if (this.live <= 0) {
            this._gameMap.gameOver = true;
            this._gameMap.stopGame();
        }
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


    get gameMap(): GameMapComponent {
        return this._gameMap;
    }

    set gameMap(value: GameMapComponent) {
        this._gameMap = value;
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


    get characterComponent(): CharacterComponent {
        return this._characterComponent;
    }

    set characterComponent(value: CharacterComponent) {
        this._characterComponent = value;
    }
}