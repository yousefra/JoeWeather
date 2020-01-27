import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-todays-weather',
    templateUrl: './todays-weather.component.html',
    styleUrls: ['./todays-weather.component.css']
})
export class TodaysWeatherComponent implements OnInit {

    @Input() todaysWeather: any;
    backgroundColor: string;

    constructor(private weather: WeatherService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.todaysWeather) {
            this.backgroundColor = `linear-gradient(45deg, ${this.weather.getColor(this.todaysWeather.weather[0].icon, false)}, ${this.weather.getColor(this.todaysWeather.weather[0].icon, false)}73)`;
        }
    }

    getDate(timestamp: number) {
        return new Date(timestamp);
    }
}
