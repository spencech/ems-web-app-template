import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { trace, empty, getparams } from "ems-web-app-utils";
import { environment } from '../../environments/environment';
import * as _ from 'underscore';

@Injectable({
	 providedIn: 'root'
})
export class AppService {
	public readonly TRANSITION_SPEED = 250;
}