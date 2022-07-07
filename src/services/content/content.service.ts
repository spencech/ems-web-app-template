import { Injectable } from '@angular/core';
import '@angular/localize/init';

@Injectable({
	 providedIn: 'root'
})
export class ContentService {
	public title: string = $localize  `Educational Media Solutions: Web Application Template`;
}