import { Component, Input } from '@angular/core';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { AppStore } from "angular2-redux";
import { ExplorePageActions } from "./../../../actions/explore-page-action";

@Component({
    selector: 'map',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    template: require('./map.component.html'),
    styles: [require('./map.component.scss')]
})
export class Map {
    @Input() entities: any[];
    @Input() lat: number;
    @Input() lng: number;

    constructor(public explorePageActions: ExplorePageActions, public appStore: AppStore){
    }

    clickOnMap(event){
        this.appStore.dispatch(this.explorePageActions.hideWindowDetails());
    }

    clickOnMarker(event){
        this.appStore.dispatch(this.explorePageActions.showWindowDetails(event.placeId));
    }
}
