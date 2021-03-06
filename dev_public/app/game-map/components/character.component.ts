import {Component, OnInit, forwardRef, Inject, ViewChild, ElementRef, HostBinding, OnChanges, SimpleChanges, Input} from '@angular/core';
import {BaseElement} from "./element";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";
import {CharacterService} from "../services/character.service";


@Component({
    moduleId: module.id,
    selector: 'character',
    templateUrl: '../templates/character.component.html',
    styleUrls: ['../css/character.component.min.css'],
})
export class CharacterComponent extends BaseElement implements OnInit, OnChanges {
    private _rotate: boolean = false;
    private _image: string;
    private _imageNumber: number;
    @ViewChild('imgElement') imgElement: ElementRef;

    constructor(protected mapService: MapService, @Inject(forwardRef(() =>  GameMapComponent)) protected _gameMap: GameMapComponent, private characterService: CharacterService, private _ref: ElementRef) {
        super();
        this.characterService.setCharacterComponent(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.element.currentValue !== undefined){
            this._image = this.element.walkAnimation;
            this.imageNumber = 0;
        }
    }

    setSelectedType() {
        this.mapService.selectedType = "character";
    }

    private getImage(){
        return this._image[this.imageNumber];
    }

    ngOnInit() {

    }

    get imageNumber(): number {
        return this._imageNumber;
    }

    set imageNumber(value: number) {
        this._imageNumber = value;
    }

    get rotate(): boolean {
        return this._rotate;
    }

    set rotate(value: boolean) {
        this._rotate = value;
    }

    get ref(): ElementRef {
        return this._ref;
    }

    set ref(value: ElementRef) {
        this._ref = value;
    }


    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get gameMap(): GameMapComponent {
        return this._gameMap;
    }
}


