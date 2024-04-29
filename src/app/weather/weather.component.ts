import { Component, OnInit,ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { WeatherService,WeatherResponse, WeatherData } from '../weather.service';
import { MatTabsModule } from '@angular/material/tabs';
import { interval } from 'rxjs';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent implements OnInit {
  cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];
  selectedCity!: string;
  weatherData?: WeatherData;
  hourlyWeather: any[] = [];
  forecast!: WeatherResponse;
  lastUpdated: Date = new Date();

  @ViewChild('searchInput') searchInputElement!: ElementRef;

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {} // Inject ChangeDetectorRef


  ngOnInit() {
    this.selectedCity = this.cities[0];
    this.getWeatherData(this.selectedCity);
    this.searchCity(this.selectedCity);
    this.updateLastUpdatedLabel(); // Update the last updated label initially

  // Call getWeatherData every 5 minutes to update/ refresh the data in UI
  interval(5 * 60 * 1000).subscribe(() => {
    this.getWeatherData(this.selectedCity);
    this.updateLastUpdatedLabel();
  });

  }
  isWeatherArray(forcst: any): boolean {
    return 'weather' in forcst && Array.isArray(forcst.weather);
  }
  getWeatherData(city: string) {
    this.weatherService.getWeather(city).subscribe((data: WeatherData) => {
      this.weatherData = data;

      this.weatherService.getFiveDayForecast(data.coord.lat, data.coord.lon).subscribe((forecastData: WeatherResponse) => {
        this.forecast = forecastData;
        console.log(this.forecast);
      });

      this.weatherService.getHourlyWeather(data.coord.lat,data.coord.lon).subscribe({
        next: (response: any) => {
          this.hourlyWeather = response.hourly;
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }
  searchCity(city: string) {
    this.weatherService.getHourlyWeather(39.9042, 116.4074).subscribe({
      next: (response: any) => {
        this.hourlyWeather = response.hourly;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  onCityChange(city: string) {
    this.selectedCity = city;
    this.getWeatherData(city);
  }
  onSearchClick(value:string): void {
    this.getWeatherData(value);
  }
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearchClick(this.searchInputElement.nativeElement.value);
    }
  }
  clearInput() {
    this.searchInputElement.nativeElement.value = '';
    this.cdr.detectChanges();
  }
  updateLastUpdatedLabel() {
    this.lastUpdated = new Date(); // Update the last updated timestamp
  }
}
