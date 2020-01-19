import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from 'src/app/services/weather-api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private currentDate: number | Date;
    private finalDate: number | Date;
    public todaysWeather: any;
    public forecasts: any;
    public detailedForecasts: any;

    constructor(private weatherAPI: WeatherAPIService, private datePipe: DatePipe) {
        this.currentDate = new Date();
        this.finalDate = new Date();
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.currentDate.setHours(0, 0, 0, 0);
        this.finalDate.setDate(this.currentDate.getDate() + 4);
        this.finalDate.setHours(0, 0, 0, 0);
        this.currentDate = this.toTimestamp(this.currentDate);
        this.finalDate = this.toTimestamp(this.finalDate);
    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(res => {
            const lat = res.coords.latitude;
            const lon = res.coords.longitude;
            // tslint:disable-next-line: no-shadowed-variable
            this.weatherAPI.getTodayByCoords(lat, lon).subscribe(res => {
                this.todaysWeather = res;
            });
            // tslint:disable-next-line: no-shadowed-variable
            this.weatherAPI.getFourDaysByCoords(lat, lon).subscribe(res => {
                this.forecasts = res;
                this.detailedForecasts = this.forecasts.list
                    .filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate);
                this.forecasts = this.detailedForecasts
                    .filter(elem => new Date(elem.dt_txt).getHours() === 12);
            });
        });
    }

    getForecastsByDay(date: string) {
        const targetDate = this.datePipe.transform(new Date(date), 'mm/dd/yyyy');
        return this.detailedForecasts.filter(elem => this.datePipe.transform(new Date(elem.dt_txt)) === targetDate);
    }

    toTimestamp(strDate) {
        const datum = Date.parse(strDate);
        return datum / 1000;
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