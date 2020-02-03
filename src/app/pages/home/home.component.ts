import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	todaysWeather: any;
	forecasts: any;
	cities: any;

	constructor(private weather: WeatherService) { }

	ngOnInit() {
		// navigator.geolocation.getCurrentPosition(res => {
		const lat = 31.527531; //res.coords.latitude;
		const lon = 35.101830; //res.coords.longitude;
		this.getWeather(lat, lon);
		this.weather.getCities(lat, lon).then(res => {
			this.cities = res;
		});
		// });
	}

	getWeather(lat: number, lon: number) {
		this.weather.getWeather(lat, lon).then(data => {
			this.todaysWeather = data.todaysWeather;
			this.forecasts = data.forecasts;
		});
	}

	getWeatherByCity(city: string) {
		this.weather.getWeatherByCity(city).then(data => {
			this.todaysWeather = data.todaysWeather;
			this.forecasts = data.forecasts;
		});
	}

	cityChanged(name: string) {
		this.getWeatherByCity(name);
	}

	getColor(icon: string, gradiant = true) {
		return this.weather.getColor(icon, gradiant);
	}
}
