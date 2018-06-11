
import { ViewContainerRef, Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';


@Injectable()
export class ToastService {
    constructor(private toastr: ToastsManager) { }
    success(msg:string) {
        this.toastr.success(msg);
    }

   
    info(msg: string) {
        this.toastr.info(msg);
    }

    warning(msg: string) {
         this.toastr.warning(msg);
    }

    error(msg: string) {
        this.toastr.error(msg);
    }

    setVCR(vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
}