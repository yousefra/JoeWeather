import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router, private alertify: AlertService) {
		if (authService.isLoggedIn()) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
	}

	onSubmit(f: NgForm) {
		const login = this.authService.login(f.value);
		if (login.succeeded) {
			this.alertify.success(login.msg);
			this.router.navigate(['/']);
		} else {
			this.alertify.error(login.msg);
		}
	}
}
