
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToastService {
    constructor(public snackBar: MatSnackBar) { }
    success(msg:string) {
        this.snackBar.open(msg);
    }

    info(msg: string) {
        this.snackBar.open(msg);
    }

    warning(msg: string) {
        this.snackBar.open(msg);
    }

    error(msg: string) {
        this.snackBar.open(msg);
    }
}