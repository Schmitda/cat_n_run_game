import {Component, OnInit, HostListener, Inject, forwardRef, OnChanges, SimpleChange} from '@angular/core';
import {Input} from "@angular/core";
import {GameMapComponent} from "./game-map.component";
import {MapService} from "../../shared/services/map.service";
import {Element} from "../../models/Element";
import {MapRepresentationService} from "../../shared/services/map-representation.service";
import {BehaviorSubject} from "rxjs";


@Component({
    moduleId: module.id,
    selector: 'decoration',
    templateUrl: '../templates/decoration.component.html',
})
export abstract class BaseElement implements OnInit, OnChanges {
    @Input() element: Element;
    @Input() xCoord: number;
    @Input() yCoord: number;
    @Input() xRatio: number;
    @Input() yRatio: number;
    protected mapService: MapService;
    private _hidden: boolean = false;
    protected shrinkFactor: number;
    protected ratio:any;


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