import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	onSubmit(f: NgForm) {
		console.log(this.authService.login(f.value));
	}

}
