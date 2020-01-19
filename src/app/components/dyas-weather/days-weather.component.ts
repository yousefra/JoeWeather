import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-days-weather',
    templateUrl: './days-weather.component.html',
    styleUrls: ['./days-weather.component.css']
})
export class DaysWeatherComponent implements OnInit {

    @Input() forecasts: any;
    @Input() getColor: any;

    constructor() { }

    ngOnInit() { }

    getDate(textDate: string) {
        return new Date(textDate);
    }

}
