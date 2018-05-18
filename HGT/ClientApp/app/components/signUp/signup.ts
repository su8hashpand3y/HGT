import { Component, Input } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { ToastService } from '../../ToastService';
import { InternetService } from '../../InternetService';


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

    constructor(private toast: ToastService, private internet: InternetService) {
        this.selectedDistrict = "";
    }

    register() {
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

        this.internet.post("/api/Login/Register", user, 'application/json').subscribe((data: any) => {
            console.log("sign up service");
            console.log(data);
            this.toast.success(data);
        }, (err: any) => {
            this.toast.error(err._body);
        });
        
    }
}
