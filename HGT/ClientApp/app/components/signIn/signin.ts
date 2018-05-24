import { Component, Input, ViewContainerRef } from '@angular/core';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';
import { InternetService } from '../../InternetService';
import { AuthService } from '../../AuthService';
import { MatDialogRef } from '@angular/material';


@Component({
    selector: 'signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.css']
})
export class SigninComponent {
    email: string="";
    password: string="";

    constructor(private toast: ToastService, private authService: AuthService, public dialogRef: MatDialogRef<SigninComponent>) { }

    signOut() {
        this.authService.logout();
        this.toast.success("Successfully Logged Out")
    }

    signIn() {
        var user = {
            email: this.email,
            password: this.password
        };

        this.toast.info("it works here too ");

        this.authService.login(user).subscribe((sucesss: any) => {
            console.log("sign in ts logn ");
            console.log(sucesss);
            if (sucesss)
            {
                if (this.dialogRef && sucesss.token)
                    this.dialogRef.close(sucesss);
                else
                    this.toast.success(`${this.email} was not Logged In`);
            }
    });
    }
}
