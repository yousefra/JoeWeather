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
      '02': '#5F4EEA',
      '03': '#F82298'
      '04': '#F82298'
      '09': '#F82298'
      '10': '#F82298'
      '11': '#F82298'
      '13': '#F82298'
      '50': '#F82298'
    };
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.forecasts);
    }, 2000);
  }

}
