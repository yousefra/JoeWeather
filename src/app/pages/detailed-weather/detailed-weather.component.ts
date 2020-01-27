import { WeatherAPIService } from 'src/app/services/weather-api.service';
import { TempPipe } from './../../pipes/temp.pipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-detailed-weather',
	templateUrl: './detailed-weather.component.html',
	styleUrls: ['./detailed-weather.component.css', '../../components/todays-weather/todays-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit {

	todaysWeather;
	details;
	objectKeys = Object.keys;
	detailColor;
	cities: any;

	constructor(private route: ActivatedRoute, private weatherAPI: WeatherAPIService, private datePipe: DatePipe, private tempPipe: TempPipe) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.todaysWeather = JSON.parse(params.todaysWeather);

			this.detailColor = `linear-gradient(0deg, ${this.getColor(this.todaysWeather.weather[0].icon, false)}9E, ${this.getColor(this.todaysWeather.weather[0].icon, false)}4A)`;
			this.details = [
				{ title: 'Feels Like', value: this.tempPipe.transform(this.todaysWeather.main.feels_like) },
				{ title: 'Maximum Tempreture', value: this.tempPipe.transform(this.todaysWeather.main.temp_max) },
				{ title: 'Minimun Tempreture', value: this.tempPipe.transform(this.todaysWeather.main.temp_min) },
				{ title: 'Pressure', value: this.todaysWeather.main.pressure + ' hpa' },
				{ title: 'Humidity', value: this.todaysWeather.main.humidity + '%' },
				{ title: 'Wind Speed', value: this.todaysWeather.wind.speed + ' m/s' }
			];
			if (!params.isNotToday) {
				const sunsetDate = new Date(this.todaysWeather.sys.sunset);
				const sunriseDate = new Date(this.todaysWeather.sys.sunrise);
				this.details.push({ title: 'Sunset', value: this.datePipe.transform(sunsetDate, 'h:mm a') });
				this.details.push({ title: 'Sunrise', value: this.datePipe.transform(sunriseDate, 'h:mm a') });
			}
			// this.getCities(this.todaysWeather.coord.lat, this.todaysWeather.coord.lon);
		});
	}

	// getCities(lat: number, lon: number) {
	// 	this.weatherAPI.getCities(lat, lon).subscribe(res => {
	// 		this.cities = res;
	// 	})
	// }

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
