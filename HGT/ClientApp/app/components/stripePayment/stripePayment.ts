import { Component } from "@angular/core";
import { InternetService } from "../../InternetService";

@Component({
    selector: 'StripePayment',
    templateUrl: './stripePayment.html',
    styleUrls: ['./stripePayment.css'],
})
export class StripePaymentComponent {
    constructor(private internet: InternetService) {}
    

    payload: any = {};

    ngOnInit() {
        this.internet.get("/payment/PreparePayment").subscribe((x: any) => { this.payload = x });
    }



    takePaymentResult: string ="";

    takePayment(productName: string, amount: number) {
        let body = {
            productName: productName,
            amount: amount
        };
        let bodyString = JSON.stringify(this.payload);
        console.log(this.payload);
        this.internet.post("https://sandboxsecure.payu.in/_payment", this.payload).subscribe((res: any) => {
            this.takePaymentResult = res.status;
        });
           

    }

    //openCheckout(productName: string, amount: number, tokenCallback:any) {
    //    let handler = (<any>window).StripeCheckout.configure({
    //        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    //        locale: 'auto',
    //        token: tokenCallback
    //    });

    //    handler.open({
    //        name: 'Our Shop',
    //        description: productName,
    //        zipCode: false,
    //        currency: 'inr',
    //        amount: amount,
    //        panelLabel: "Pay {{amount}}",
    //        allowRememberMe: false
    //    });
    //}

    buyTShirt() {
        this.takePayment("T-Shirt", 1000);
    }
    //buyTrainers() {
    //    this.openCheckout("Trainers", 1500, (token: any) => this.takePayment("Trainers", 1500, token));
    //}
    //buyJeans() {
    //    this.openCheckout("Jeans", 2000, (token: any) => this.takePayment("Jeans", 2000, token));
    //}
}