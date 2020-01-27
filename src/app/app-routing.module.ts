import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailedWeatherComponent } from './pages/detailed-weather/detailed-weather.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'details/:id', component: DetailedWeatherComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
