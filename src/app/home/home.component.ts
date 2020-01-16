import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from '../weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private currentDate;
  private finalDate;
  public todaysWeather;
  public forecasts;

  constructor(private weatherAPI: WeatherAPIService) {
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
      this.weatherAPI.getTodayByCoords(lat, lon).subscribe(res => {
        this.todaysWeather = res;
      });
      this.weatherAPI.getFourDaysByCoords(lat, lon).subscribe(res => {
        this.forecasts = res.list
          .filter(elem => elem.dt > this.currentDate && elem.dt < this.finalDate)
          .filter(elem => new Date(elem.dt_txt).getHours() === 0);
      });
    });
  }

  toTimestamp(strDate) {
    let datum = Date.parse(strDate);
    return datum / 1000;
  }
}
