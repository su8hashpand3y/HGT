import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'signUp',
    templateUrl: './signUp.html',
    styleUrls: ['./signUp.css']
})
export class SignUpComponent {
    firstName: string;
    lastName: string;
    email: string;
    capthaName: string;
    capthaAnswer: string;
    password: string;
    district: string;
    town: string;
    districts: string[] = ["Shimla", "Other"]
    Sdistrict: string
    gender: string

    constructor(private http: HttpClient) { }

    register() {
        console.log("Registering" + this.firstName);
        console.log("Registering" + this.Sdistrict);
        console.log("Registering" + this.gender);
        this.http.post("/api/SampleData/Register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            capthaName: this.capthaName,
            capthaAnswer: this.capthaAnswer,
            password: this.password,
            district: this.district,
            town: this.town,
            Sdistrict: this.Sdistrict,
            gender: this.gender,
        })
    }
}
