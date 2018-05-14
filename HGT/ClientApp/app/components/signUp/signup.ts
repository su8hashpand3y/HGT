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

    register() {

    }
}
