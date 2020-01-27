import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { WeatherAPIService } from './weather-api.service';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	private currentDate: number | Date;
	private finalDate: number | Date;

	constructor(private weatherAPI: WeatherAPIService) {
		this.generateDates();
	}

	getForecasts(lat: number, lon: number) {
		return new Promise(resolve => {
			this.weatherAPI.getFourDaysByCoords(lat, lon).subscribe(res => {
				const result = res.list
					.filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate)
					.filter(elem => new Date(elem.dt_txt).getHours() === 12);
				resolve(result);
			});
		});
	}

	getCurrentWeather(lat: number, lon: number) {
		return new Promise(resolve => {
			this.weatherAPI.getTodayByCoords(lat, lon).subscribe(res => {
				resolve(res);
			});
		});
	}

	getForecastsByCity(city: string) {
		return new Promise(resolve => {
			this.weatherAPI.getFourDaysByCity(city).subscribe(res => {
				const result = res.list
					.filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate)
					.filter(elem => new Date(elem.dt_txt).getHours() === 12);
				resolve(result);
			});
		});
	}

	getCurrentWeatherByCity(city: string) {
		return new Promise(resolve => {
			this.weatherAPI.getTodayByCity(city).subscribe(res => {
				resolve(res);
			});
		});
	}

	async getWeather(lat: number, lon: number) {
		const todaysWeather = await this.getCurrentWeather(lat, lon);
		const forecasts = await this.getForecasts(lat, lon);
		return { todaysWeather, forecasts };
	}

	async getWeatherByCity(city: string) {
		const todaysWeather = await this.getCurrentWeatherByCity(city);
		const forecasts = await this.getForecastsByCity(city);
		return { todaysWeather, forecasts };
	}

	getCities(lat: number, lon: number) {
		this.weatherAPI.getCities(lat, lon).subscribe(res => {
			return res;
		})
	}

	getColor(icon: string, gradiant = true) {
		if (icon) {
			const color = environment.colors[icon.slice(0, -1)];
			if (gradiant) {
				return `linear-gradient(20deg, ${color}, ${color}96)`;
			}
			return color;
		}
	}

	private generateDates() {
		this.currentDate = new Date();
		this.finalDate = new Date();
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentDate.setHours(0, 0, 0, 0);
		this.finalDate.setDate(this.currentDate.getDate() + 4);
		this.finalDate.setHours(0, 0, 0, 0);
		this.currentDate = this.toTimestamp(this.currentDate);
		this.finalDate = this.toTimestamp(this.finalDate);
	}

	private toTimestamp(strDate) {
		const datum = Date.parse(strDate);
		return datum / 1000;
	}
}
