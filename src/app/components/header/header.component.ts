import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherAPIService } from 'src/app/services/weather-api.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Input() cities: any;
	@Input() cityName: string;
	@Output() newCity = new EventEmitter();
	todaysWeather: any;
	getColor: any;

	constructor(private weatherAPI: WeatherAPIService) { }

	ngOnInit() { }

	changeCity(name: string) {
		this.closeNav();
		this.newCity.emit(name);
	}

	openNav() {
		document.getElementById('mySidenav').style.width = '100%';
	}

	closeNav() {
		document.getElementById('mySidenav').style.width = '0';
	}

}
