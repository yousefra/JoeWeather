import { DatePipe } from '@angular/common';
import { WeatherService } from './../../services/weather.service';
import { TempPipe } from './../../pipes/temp.pipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-detailed-weather',
	templateUrl: './detailed-weather.component.html',
	styleUrls: ['./detailed-weather.component.css', '../../components/todays-weather/todays-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit {

	todaysWeather: any;
	forecasts: any;
	details: any;
	objectKeys = Object.keys;
	detailColor: string;
	cities: any;

	constructor(private route: ActivatedRoute, private weather: WeatherService, private datePipe: DatePipe, private tempPipe: TempPipe) { }

	ngOnInit() {
		const id = parseInt(this.route.snapshot.params.id);
		this.route.params.subscribe(params => {
			const city = JSON.parse(params.city);
			const data = this.getWeatherByCity(city);
			if (id) {
				this.todaysWeather = this.forecasts[id - 1];
			}

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

	getWeatherByCity(city: string) {
		this.weather.getWeatherByCity(city).then(data => {
			return { todaysWeather: data.todaysWeather, forecasts: data.forecasts };
		});
	}

	cityChanged(name: string) {
		this.getWeatherByCity(name);
	}

	getColor(icon: string, gradiant = true) {
		return this.weather.getColor(icon, gradiant);
	}
}
