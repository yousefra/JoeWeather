import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherAPIService } from 'src/app/services/weather-api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private currentDate: number | Date;
	private finalDate: number | Date;
	todaysWeather: any;
	forecasts: any;
	detailedForecasts: any;
	cities: any;
	cityName: string;
	inputData: any;

	constructor(private weatherAPI: WeatherAPIService, private datePipe: DatePipe) {
		this.generateDates();
	}

	ngOnInit() {
		navigator.geolocation.getCurrentPosition(res => {
			const lat = res.coords.latitude;
			const lon = res.coords.longitude;
			this.getWeather(lat, lon);
			this.getCities(lat, lon);
			this.inputData = { todaysWeather: this.todaysWeather, forecasts: this.forecasts, getColor: this.getColor };
		});
	}

	getForecasts(lat: number, lon: number) {
		this.weatherAPI.getFourDaysByCoords(lat, lon).subscribe(res => {
			this.forecasts = res;
			this.detailedForecasts = this.forecasts.list
				.filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate);
			this.forecasts = this.detailedForecasts
				.filter(elem => new Date(elem.dt_txt).getHours() === 12);
		});
	}

	getCurrentWeather(lat: number, lon: number) {
		this.weatherAPI.getTodayByCoords(lat, lon).subscribe(res => {
			this.todaysWeather = res;
			this.cityName = this.todaysWeather.name;
		});
	}

	getForecastsByCity(city: string) {
		this.weatherAPI.getFourDaysByCity(city).subscribe(res => {
			this.forecasts = res;
			this.detailedForecasts = this.forecasts.list
				.filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate);
			this.forecasts = this.detailedForecasts
				.filter(elem => new Date(elem.dt_txt).getHours() === 12);
		});
	}

	getCurrentWeatherByCity(city: string) {
		this.weatherAPI.getTodayByCity(city).subscribe(res => {
			this.todaysWeather = res;
			this.cityName = this.todaysWeather.name;
		});
	}

	getWeather(lat: number, lon: number) {
		this.getCurrentWeather(lat, lon);
		this.getForecasts(lat, lon);
	}

	getWeatherByCity(city: string) {
		this.getCurrentWeatherByCity(city);
		this.getForecastsByCity(city);
	}

	getForecastsByDay(date: string) {
		const targetDate = this.datePipe.transform(new Date(date), 'mm/dd/yyyy');
		return this.detailedForecasts.filter(elem => this.datePipe.transform(new Date(elem.dt_txt)) === targetDate);
	}

	getCities(lat: number, lon: number) {
		this.weatherAPI.getCities(lat, lon).subscribe(res => {
			this.cities = res;
		})
	}

	cityChanged(name: string) {
		this.getWeatherByCity(name);
	}

	generateDates() {
		this.currentDate = new Date();
		this.finalDate = new Date();
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentDate.setHours(0, 0, 0, 0);
		this.finalDate.setDate(this.currentDate.getDate() + 4);
		this.finalDate.setHours(0, 0, 0, 0);
		this.currentDate = this.toTimestamp(this.currentDate);
		this.finalDate = this.toTimestamp(this.finalDate);
	}

	toTimestamp(strDate) {
		const datum = Date.parse(strDate);
		return datum / 1000;
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
}
