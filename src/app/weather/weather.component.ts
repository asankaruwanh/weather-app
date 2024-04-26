import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];
  selectedCity!: string;
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.selectedCity = this.cities[0];
    this.getWeatherData(this.selectedCity);
  }

  getWeatherData(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
    });
  }

  onCityChange(city: string) {
    this.selectedCity = city;
    this.getWeatherData(city);
  }
}
