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

    public todaysWeather;
    public details;
    public objectKeys = Object.keys;
    public detailColor;

    constructor(private route: ActivatedRoute, private datePipe: DatePipe, private tempPipe: TempPipe) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.todaysWeather = JSON.parse(params.todaysWeather);
            // tslint:disable-next-line:max-line-length
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
        });
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
