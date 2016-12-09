import {Component, OnInit, HostListener, Inject, forwardRef} from '@angular/core';
import {Input} from "@angular/core";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";


@Component({
    moduleId: module.id,
    selector: 'decoration',
    templateUrl: '../templates/decoration.component.html',
})
export abstract class BaseElement implements OnInit {
    @Input() element: Element;
    @Input() xCoord: number;
    @Input() yCoord: number;
    protected mapService: MapService;
    private _hidden: boolean = false;


    public setVisible(){
        this._hidden = false;
    }

    public abstract setSelectedType();


    constructor() {

    }

    ngOnInit() { }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
    }


}