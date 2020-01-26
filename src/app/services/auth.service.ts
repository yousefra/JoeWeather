import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }

	login(model: any) {
		const succeeded = model.email === 'joe@pseu.edu' && model.password === 'DiePotato!';
		if (succeeded) {
			localStorage.setItem('token', 'Dump Token');
		}
		return succeeded;
	}
}
