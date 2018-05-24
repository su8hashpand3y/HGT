import { Injectable} from '@angular/core';
import {  Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { ToastService } from './ToastService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class InternetService {
    constructor(private http: HttpClient, private toast: ToastService) { }

    get(url: string, contentType?: string): Observable<Object> {

        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new HttpHeaders({ 'Authorization': token });
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        // let requestOptions = new RequestOptions({ headers: headers });
        return this.http.get(url, { headers: headers });//.pipe(map((res: any) => res.json(), (err: any) => {
        ////    console.log(err);
        ////    // Log Error to server here
        ////}));
    }

    post(url: string, body: any, contentType?: string): Observable<Object> {

        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new HttpHeaders({ 'Authorization': token });
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        //let requestOptions = new RequestOptions({ headers: headers });
        return this.http.post(url, body, { headers: headers }); //.pipe(map((err: any) => {
        //    console.log(err);
        //    console.log("internet service");
        //    console.log(err._body);
        //    // Log Error to server here
        //}));
    }

}