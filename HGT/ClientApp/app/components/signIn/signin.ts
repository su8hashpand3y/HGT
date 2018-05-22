import { Component, Input, ViewContainerRef } from '@angular/core';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';
import { InternetService } from '../../InternetService';
import { AuthService } from '../../AuthService';


@Component({
    selector: 'signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.css']
})
export class SigninComponent {
    email: string;
    password: string;

    constructor(private toast: ToastService, private authService: AuthService) { }

    signOut() {
        this.authService.logout();
        this.toast.success("Successfully Logged Out")
    }

    signIn() {
        var user = {
            email: this.email,
            password: this.password
        };

        this.authService.login(user).subscribe(sucesss => {
            if (sucesss)
                this.toast.success(`${this.email} is successfully Logged In`);
            else
                this.toast.error(`${this.email} was not Logged In`);
    });
    }
}
