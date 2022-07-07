import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { trace, empty, getparams } from "ems-web-app-utils";
import { environment } from '../../environments/environment';
import { IUser, User } from "../../classes";

@Injectable({
	 providedIn: 'root'
})
export class AppService {
	public readonly TRANSITION_SPEED = 250;

	private userSource:BehaviorSubject<User|undefined> = new BehaviorSubject<User|undefined>(undefined);
	public user = this.userSource.asObservable();

	public setCurrentUser(user: User) {
		this.userSource.next(user);
	}
}