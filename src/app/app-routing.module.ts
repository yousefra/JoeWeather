import { HomeComponent } from './pages/home/home.component';
import { DetailedWeatherComponent } from './pages/detailed-weather/detailed-weather.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: DetailedWeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
