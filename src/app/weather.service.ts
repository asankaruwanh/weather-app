import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = '482944e26d320a80bd5e4f23b3de7d1f';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get(`${this.apiUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`).pipe(
      map(response => response as WeatherData) // Cast the response to WeatherData
    );
  }
  getHourlyWeather(lat: number, lon: number) {
        return this.http.get(`${this.apiUrl}onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&exclude=currentminutely,daily,alerts&units=metric`);
  }


  getFiveDayForecast(lat: number, lon: number): Observable<WeatherResponse> {
    const url = `${this.apiUrl}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherResponse>(url);
  }
}
interface WeatherIcon {
  icon: string;
}

interface Forecast {
  weather: WeatherIcon[];
}
interface ForecastResponse {
  list: Forecast[];
}
export interface WeatherResponse {
  list: {
    weather: [
      {
        icon: string;
        description:string;
      }
    ];
    dt_txt:string;
    main:
     { temp_min:string;
      temp_max:string;
  }
  }[];
}

export interface WeatherData {
 coord:{
  lat:number;
  lon:number;
 }
}
