import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WeatherAPIService {

    constructor(private http: HttpClient) { }

    getTodayByCity(city: string, unit = 'c') {
        return this.getWeather('weather', unit, { q: city });
    }

    getTodayByCoords(lat: number, lon: number, unit = 'c') {
        return this.getWeather('weather', unit, { lat, lon });
    }

    getFourDaysByCity(city: string, unit = 'c') {
        return this.getWeather('forecast', unit, { q: city });
    }

    getFourDaysByCoords(lat: number, lon: number, unit = 'c') {
        return this.getWeather('forecast', unit, { lat, lon });
    }

    getCities(lat: number, lon: number, unit = 'c') {
        return this.getWeather('find', unit, { lat, lon });
    }

    getWeather(base: string, unit: string, params: any) {
        const units = unit === 'c' ? 'metric' : 'imperial';
        const baseParams = {
            APPID: environment.weatherApiKey
        };
        const finalParams = { ...baseParams, ...params, units };

        return this.http.get(`${environment.weatherApi}${base}`, { params: finalParams });
    }
}
