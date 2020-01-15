import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  private APPID = 'a1e2a9b1664364451d7407f4085e5864';
  private URL = 'http://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getTodayByCity(city: string) {
    return this.http.get(`${this.URL}/weather?q=${city}&units=metric&APPID=${this.APPID}`);
  }

  getTodayByCoords(lat: number, lon: number) {
    return this.http.get(`${this.URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.APPID}`);
  }

  getFourDaysByCity(city: string) {
    return this.http.get(`${this.URL}/forecast?q=${city}&units=metric&APPID=${this.APPID}`);
  }

  getFourDaysByCoords(lat: number, lon: number) {
    return this.http.get(`${this.URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${this.APPID}`);
  }

  convertFtoC(f) {
    return parseFloat((f - 273.5).toFixed(1));
  }
}
