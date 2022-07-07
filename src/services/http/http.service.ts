import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, tap, take } from "rxjs/operators";
import { trace, empty, getparams } from "ems-web-app-utils";
import { IUser, User } from "../../classes";

import * as _ from "underscore";

export enum Status {
	"Success" = 200,
	"Unauthorized" = 401,
	"Forbidden" = 403,
	"NotFound" = 404
}

@Injectable({
	 providedIn: 'root'
})
export class HttpService {

	public jwt: string = "";
	private url: string = environment.endpoint;
	private authorization: string = "";

	constructor(private http: HttpClient) { 
		const accessToken = getparams("access_token") || window.localStorage.getItem("access_token");
		const idToken = getparams("id_token") || window.localStorage.getItem("id_token");
	    
	    if(empty(accessToken) || empty(idToken)) {
	      window.localStorage.clear();
	    } else {
	      window.localStorage.setItem("access_token", accessToken);
	      window.localStorage.setItem("id_token", idToken);
	  	}
	  	
	  	this.jwt = accessToken;
	}

	public authenticate(): Promise<any> {
		const request = `${environment.cognito.api}/userInfo`;
		return this.executeGetRequest(request, undefined, true);
	}
	
	public authorize(): Promise<any> {
		const request = this.buildRequest(`authorize`);
		return this.executeGetRequest(request, (response: any) => {
			this.authorization = response.authorization;
			return response.networks;
		}, true);
	} 

	public getUser(): Promise<User> {
		const request = `/assets/user.stump.json`;
		return this.executeGetRequest(request, User.generateUser);
	}

	private executeGetRequest(request: string, transform?: (input: any) => any, suppressErrors?: boolean ): Promise<any> {
		const headers = this.headers();
		return this.http.get(request, { headers, withCredentials: true } ).pipe(
				map((result: any) => 
					transform ?  transform(result) : result
				),
	      		catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
	  	).toPromise();
	}

	private executeDeleteRequest(request: string, suppressErrors: boolean = false): Promise<any> {
		const headers = this.headers();
		return this.http.delete(request, { headers, withCredentials: true }).pipe(
			catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
		).toPromise();
	}

	private executePutRequest(request: string, data: any, transform?: (input: any) => any, suppressErrors: boolean = false, errorHandler?: (error: HttpErrorResponse) => any): Promise<any> {
		const headers = this.headers();
		return this.http.put(request, data, { headers, withCredentials: true }).pipe(
			map((result: any) => 
					transform ?  transform(result) : result
			),
			catchError(suppressErrors ? this.handleErrorQuietly : (errorHandler || this.handleError))
		).toPromise();
	}

	private executePostRequest(request: string, data: any, transform?: (input: any) => any, suppressErrors?: boolean): Promise<any> {
		const headers = this.headers();
		return this.http.post(request, data, { headers, withCredentials: true } ).pipe(
			map((result: any) => 
				transform ?  transform(result) : result
			),
			catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
		).toPromise();
	}


	private buildRequest(endpoint: string): string {
		return `${this.url}/${endpoint}`;
	}

	private handleError(error: HttpErrorResponse) {
		return throwError(error);
	}

	private handleErrorQuietly(error: HttpErrorResponse) {
		trace(error);
		return of(null);
	}

	private headers(custom: any = {}): HttpHeaders {
		const headers = _.extend({ 
	        "Content-Type": "application/json",
	        "Authorization": empty(this.jwt) ? "" : `Bearer ${this.jwt}`,
	        "X-Auth-Token": this.authorization
	     }, custom);
		return new HttpHeaders(headers);
	}
}
