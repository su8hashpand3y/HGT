import { InternetService } from "./InternetService";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material";
import { SigninComponent } from "./components/signin/signin";

@Injectable()
export class AuthService {
    constructor(private internet: InternetService, private dialog: MatDialog) { }

    isAuthenticated() {
        let token = localStorage.getItem('token');
        return token;
    }

    login(user: { email: string, password: string }) {
        let finish = new Subject();
        this.internet.post("/api/Login/Login", user, "application/json").subscribe((data: any) => {
            localStorage.setItem('token', data.token);
            console.log(`Utoken received ${data.token}`)
            finish.next(data);
        });

        return finish;
    }

    logout() {
        localStorage.removeItem('token');
    }

    openLoginDialog() {
        let finish = new Subject();
        console.log("Oprining Dialog")
        let dialogRef = this.dialog.open(SigninComponent);

        dialogRef.afterClosed().subscribe((result: any) => {
            console.log("Dialog was closed with ");
            console.log(result)
            if (result && result.token) {

                localStorage.setItem('token', result.token);
                finish.next(result);
            }
        });

        console.log("returning handler")
        return finish;
    }
}