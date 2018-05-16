import { Component, Input, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';


@Component({
    selector: 'signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.css']
})
export class SigninComponent {
    email: string;
    password: string;
    
    constructor(private http: Http, private toast: ToastService) { }

}
