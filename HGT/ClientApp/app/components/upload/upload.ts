import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'upload',
    templateUrl: './upload.html',
    styleUrls: ['./upload.css']
})
export class UploadComponent {
    constructor(private http: Http) {
        this.category = "";
    }

    name: string;
    description: string;
    categories: string[] = ["Music", "Dance", "Other"];
    category: string


    upload(selectedFile: File) {
        console.log(selectedFile);
        let formData: FormData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);

        //formData.append('email', "hello world");
        // send other info also 
        formData.append('category', this.category);
        formData.append('name', this.name);
        formData.append('description', this.description);

        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new Headers();
        headers.append('Authorization', token);

        /** In Angular 5, including the header Content-Type can invalidate your request */
        // headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/SampleData/upload", formData, options)
           // .map(res => res.json())
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
    }
}
