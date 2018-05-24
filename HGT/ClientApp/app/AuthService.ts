import { InternetService } from "./InternetService";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
    constructor(private internet: InternetService) { }

    isAuthenticated() {
        let token = localStorage.getItem('token');
        return token;
    }

    login(user: { email: string, password: string }) {
        let finish = new Subject();
        this.internet.post("/api/Login/Login", user, "application/json").subscribe((data: any) => {
            localStorage.setItem('token', data.token);
            console.log(`Utoke ${data.token}`)
            finish.next(data.token);
        });

        return finish;
    }

    logout() {
        localStorage.removeItem('token');
    }
}