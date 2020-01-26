import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './../pages/login/login.component';


@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule
	],
	exports: [
		LoginComponent
	]
})
export class AuthModule { }
