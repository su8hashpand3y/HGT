import { Component, Input, ViewContainerRef } from '@angular/core';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';
import { InternetService } from '../../InternetService';


@Component({
    selector: 'signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.css']
})
export class SigninComponent {
    email: string;
    password: string;

    constructor(private toast: ToastService, private internet: InternetService) { }


    getSecret() {
        this.internet.get("/api/SampleData/GetSecret", "application/json").subscribe((data: any) => {
            this.toast.success(data);
        });
    }

    signOut() {
        localStorage.removeItem('token');
    }

    signIn() {
        var user = {
            email: this.email,
            password: this.password
        };

        this.internet.post("/api/Login/Login", user, "application/json").subscribe((data: any) => {
            localStorage.setItem('token', data.token);
        });
    }
}
