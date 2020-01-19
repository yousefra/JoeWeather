import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-todays-weather',
    templateUrl: './todays-weather.component.html',
    styleUrls: ['./todays-weather.component.css']
})
export class TodaysWeatherComponent implements OnInit {

    @Input() todaysWeather;
    @Input() getColor;
    public backgroundColor: string;

    constructor() { }

    ngOnInit() {
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
        if (this.todaysWeather) {
            console.log(this.todaysWeather);
            // tslint:disable-next-line:max-line-length
            this.backgroundColor = `linear-gradient(45deg, ${this.getColor(this.todaysWeather.weather[0].icon, false)}, ${this.getColor(this.todaysWeather.weather[0].icon, false)}73)`;
        }
    }

    getDate(timestamp: number) {
        return new Date(timestamp);
    }
}
