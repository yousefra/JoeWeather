import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Input() cities: any;
	todaysWeather: any;
	getColor: any;

	constructor() { }

	ngOnInit() {
		console.log(this.cities)
	}

	openNav() {
		document.getElementById('mySidenav').style.width = '100%';
	}

	closeNav() {
		document.getElementById('mySidenav').style.width = '0';
	}

}
