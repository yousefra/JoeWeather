import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }

	login(model: any) {
		const succeeded = model.email === 'joe@pseu.edu' && model.password === 'DiePotato!';
		let msg = 'Email or password incorrect';
		if (succeeded) {
			localStorage.setItem('token', 'Dump Token');
			msg = 'Loggen in successfully';
		}
		return { succeeded, msg };
	}

	isLoggedIn() {
		if (localStorage.getItem('token')) {
			return true;
		}
		return false;
	}
}
