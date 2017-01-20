import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>
                <map-load-modal></map-load-modal>
`,
})
export class AppComponent {
    title = 'Minimal NgModule Test';
}
