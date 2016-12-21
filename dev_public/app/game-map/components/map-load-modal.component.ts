import {Component, OnInit, HostBinding, ViewContainerRef, Renderer, ElementRef} from '@angular/core';
import {Modal} from "../../shared/components/Modal";
import {MapService} from "../../shared/services/map.service";
import {MapCreator} from "../../shared/services/map-creator.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    moduleId: module.id,
    selector: 'map-load-modal',
    templateUrl: '../templates/map-load-modal.component.html',
    styleUrls: ['../css/map-load-modal.component.min.css'],
})
export class MapLoadModalComponent extends Modal implements OnInit {
    private maps: any[];


    constructor(private mapService: MapService, private mapCreator: MapCreator, private ref: ElementRef, private renderer: Renderer) {
        super();
        this.mapService.getAll().subscribe((results) => {
            this.maps = results;
        })
    }

    public hide(): any {
        this.renderer.setElementStyle(this.ref.nativeElement,'display','none');
        return super.hide();
    }

    private loadMap(map:any){
        this.mapCreator.loadMap(map);
        this.hide();
    }


    public show(): any {
        this.renderer.setElementStyle(this.ref.nativeElement,'display','block');
        return super.show();
    }

    ngOnInit() {

    }

}


