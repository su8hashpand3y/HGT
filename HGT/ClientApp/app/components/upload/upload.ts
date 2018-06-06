import { Component, Input } from '@angular/core';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { InternetService } from '../../InternetService';
import { ToastService } from '../../ToastService';
import { AuthService } from '../../AuthService';

@Component({
    selector: 'upload',
    templateUrl: './upload.html',
    styleUrls: ['./upload.css']
})
export class UploadComponent {
    constructor(private internet: InternetService, private toast: ToastService, private authService: AuthService) {
        this.category = "";
    }

    title: string = "";
    description: string = "";
    categories: string[] = ["Music", "Dance", "Other"];
    category: string = "";


    upload(selectedFile: File) {
        // Check whether greater than 500MB and reject if so if (selectedFile.size > )
        if (!this.authService.isAuthenticated()) {
            console.log("Should Open a popup now")
            this.authService.openLoginDialog().subscribe((x: any) => {
                console.log("Dialogue returned something")
                let formData: FormData = new FormData();
                formData.append('file', selectedFile, selectedFile.name);
                formData.append('category', this.category);
                formData.append('title', this.title);
                formData.append('description', this.description);
                this.internet.post("/api/Upload/upload", formData)
                    .subscribe(
                    data => {
                        console.log('success');
                        this.toast.success(`Your video ${this.title} was uploaded successfully and is under review.`)
                    }
                    );
            });
        }
        else {
            let formData: FormData = new FormData();
            formData.append('file', selectedFile, selectedFile.name);
            formData.append('category', this.category);
            formData.append('title', this.title);
            formData.append('description', this.description);
            this.internet.post("/api/Upload/upload", formData)
                .subscribe(
                data => {
                    console.log('success');
                    this.toast.success(`Your video ${this.title} was uploaded successfully and is under review.`)
                });
        }

    }
}
