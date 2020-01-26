import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodaysWeatherComponent } from './components/todays-weather/todays-weather.component';
import { DetailedWeatherComponent } from './pages/detailed-weather/detailed-weather.component';
import { DaysWeatherComponent } from './components/dyas-weather/days-weather.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TempPipe } from './pipes/temp.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TodaysWeatherComponent,
    DetailedWeatherComponent,
    DaysWeatherComponent,
    HomeComponent,
    HeaderComponent,
    TempPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule
  ],
  providers: [DatePipe, TempPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
