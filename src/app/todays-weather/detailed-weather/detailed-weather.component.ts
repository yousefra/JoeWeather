import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detailed-weather',
    templateUrl: './detailed-weather.component.html',
    styleUrls: ['./detailed-weather.component.css', '../todays-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit {

    public todaysWeather;
    public details;
    public objectKeys = Object.keys;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.todaysWeather = JSON.parse(params.todaysWeather);
            const sunsetDate = new Date(this.todaysWeather.sys.sunset);
            const sunriseDate = new Date(this.todaysWeather.sys.sunrise);
            this.details = [
                { title: 'Sunset', value: this.getTime(sunsetDate) },
                { title: 'Sunrise', value: this.getTime(sunriseDate) },
                { title: 'Feels Like', value: this.todaysWeather.main.feels_like },
                { title: 'Maximum Tempreture', value: this.todaysWeather.main.temp_max },
                { title: 'Minimun Tempreture', value: this.todaysWeather.main.temp_min },
                { title: 'Pressure', value: this.todaysWeather.main.pressure },
                { title: 'Humidity', value: this.todaysWeather.main.humidity },
                { title: 'Wind Speed', value: this.todaysWeather.wind.speed }
            ];
            console.log(this.details);
        })
    }

    getTime(date: Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let status;
        if (hours >= 12) {
            status = 'pm';
        } else {
            status = 'am';
        }
        return ('0' + hours).substr(('' + hours).length - 2, ('' + hours).length) + ':'
             + ('0' + minutes).substr(('' + minutes).length - 2, ('' + minutes).length) + ' ' + status;
    }

}
