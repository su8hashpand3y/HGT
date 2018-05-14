import { Component, Input } from '@angular/core';

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


    setGender(gender: string) {
        this.gender = gender;
    }


    register() {
        console.log("Registering" + this.firstName);
        console.log("Registering" + this.Sdistrict);
        console.log("Registering" + this.gender);
    }
}
