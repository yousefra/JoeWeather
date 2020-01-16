import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-days-weather',
    templateUrl: './days-weather.component.html',
    styleUrls: ['./days-weather.component.css']
})
export class DaysWeatherComponent implements OnInit {

    @Input() forecasts;
    public colors;

    constructor() {
        this.colors = {
            '01': '#5F4EEA',
            '02': '#28E0AE',
            '03': '#FF0090',
            '04': '#FFAE01',
            '09': '#2299F9',
            '10': '#DA2727',
            '11': '#D0DDF7',
            '13': '#5F4EEA',
            '50': '#5F4EEA'
        };
    }

    ngOnInit() { }

}
