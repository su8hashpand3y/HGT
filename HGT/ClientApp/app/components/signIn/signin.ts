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


    getSecret() {
        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new Headers({ 'Authorization': token });
        let options = new RequestOptions({ headers: headers });

        this.http.get("/api/SampleData/GetSecret", options).subscribe((data: any) => {
            let result = JSON.parse(data._body);
            this.toast.success(result);
            console.log(result);
        }, err => {
            this.toast.error(err._body);
            console.log(err);
        });
    }

    signOut() {
        console.log("logging Out");
        localStorage.removeItem('token');
    }

    signIn() {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var user = {
            email: this.email,
            password: this.password
        };

        this.http.post("/api/SampleData/Login", user, options).subscribe((data: any) => {
            let result = JSON.parse(data._body);
            localStorage.setItem('token', result.token);
        }, err => {
            this.toast.error(err._body);
            console.log(err);
        });
    }
}
