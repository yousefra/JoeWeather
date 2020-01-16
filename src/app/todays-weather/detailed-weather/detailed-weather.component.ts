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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todaysWeather = JSON.parse(params.todaysWeather);
      // this.details = this.todaysWeather.main;
      this.details = {
        ...this.todaysWeather.main,
        windSpeed: this.todaysWeather.wind.speed,
        sunrise: this.todaysWeather.sys.sunrise,
        sunset: this.todaysWeather.sys.sunset
      };
      console.log(this.details);
    })
  }

}
