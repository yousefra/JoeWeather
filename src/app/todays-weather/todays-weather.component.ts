import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todays-weather',
  templateUrl: './todays-weather.component.html',
  styleUrls: ['./todays-weather.component.css']
})
export class TodaysWeatherComponent implements OnInit {

  @Input() todaysWeather;

  constructor() { }

  ngOnInit() { }
}
