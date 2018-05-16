import { Component, ViewContainerRef } from '@angular/core';
import { ToastService } from '../../ToastService';
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(vcr: ViewContainerRef, private ts: ToastService) {
        ts.setVCR(vcr);
    }
}
