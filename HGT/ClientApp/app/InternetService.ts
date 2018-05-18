import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { ToastService } from './ToastService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InternetService {
    constructor(private http: Http, private toast: ToastService) { }

    get(url: string, contentType?: string): Observable<Response> {

        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new Headers({ 'Authorization': token });
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        let requestOptions = new RequestOptions({ headers: headers});
        return this.http.get(url, requestOptions).map(res => res.json(), (err: any) => {
            console.log(err);
            // Log Error to server here
        });
    }

    post(url: string, body: any, contentType?: string): Observable<Response> {

        let token = localStorage.getItem('token');
        token = `Bearer ${token}`;
        let headers = new Headers({ 'Authorization': token });
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        let requestOptions = new RequestOptions({ headers: headers });
        return this.http.post(url, body, requestOptions).map(res => res.json(), (err: any) => {
            console.log(err);
            console.log("internet service");
            console.log(err._body);
            // Log Error to server here
        });
    }

}