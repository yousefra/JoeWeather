import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-days-weather',
    templateUrl: './days-weather.component.html',
    styleUrls: ['./days-weather.component.css']
})
export class DaysWeatherComponent implements OnInit {

    @Input() forecasts: any;

    constructor(private weather: WeatherService) { }

    ngOnInit() { }

    getDate(textDate: string) {
        return new Date(textDate);
    }

    getColor(icon: string, gradiant = true) {
        return this.weather.getColor(icon, gradiant);
    }
}
