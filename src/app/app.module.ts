import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodaysWeatherComponent } from './todays-weather/todays-weather.component';
import { DetailedWeatherComponent } from './todays-weather/detailed-weather/detailed-weather.component';
import { DaysWeatherComponent } from './dyas-weather/days-weather.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TodaysWeatherComponent,
    DetailedWeatherComponent,
    DaysWeatherComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
