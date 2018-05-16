import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


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
    districts: string[] = ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"];
    selectedDistrict: string
    gender: string

    constructor(private http: Http) { }

    register() {

        console.log("registering");

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let user = {
            firstName: this.firstName || "",
            lastName: this.lastName || "",
            email: this.email || "",
            capthaName: this.capthaName || "",
            capthaAnswer: this.capthaAnswer || "",
            password: this.password || "",
            district: this.selectedDistrict || "",
            town: this.town || "",
            gender: this.gender || "",
        };

        console.log(user);

        this.http.post("/api/SampleData/Register", user,options).subscribe(x => console.log(x));
    }
}
