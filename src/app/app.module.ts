import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [WeatherService],
  bootstrap: [WeatherComponent]
})
export class AppModule { }
