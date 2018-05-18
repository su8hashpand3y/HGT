import { Component, Input } from '@angular/core';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { InternetService } from '../../InternetService';
import { ToastService } from '../../ToastService';

@Component({
    selector: 'upload',
    templateUrl: './upload.html',
    styleUrls: ['./upload.css']
})
export class UploadComponent {
    constructor(private internet: InternetService, private toast: ToastService) {
        this.category = "";
    }

    name: string;
    description: string;
    categories: string[] = ["Music", "Dance", "Other"];
    category: string


    upload(selectedFile: File) {
        let formData: FormData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        formData.append('category', this.category);
        formData.append('name', this.name);
        formData.append('description', this.description);
        this.internet.post("/api/Upload/upload", formData)
            .subscribe(
            data => {
                console.log('success');
                this.toast.success(`Your video ${this.name} was uploaded successfully and is under review.`)
            }
        );
    }
}
