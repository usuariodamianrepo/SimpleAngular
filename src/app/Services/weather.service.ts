import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Weather } from '../Models/Weather';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private http=inject(HttpClient);
  private apiUrl = appsettings.apiUrl + "Weather/getandsave";

  constructor() { }

  getWeather(id:number, showHistorial: boolean){
    return this.http.get<Weather[]>(`${this.apiUrl}?id=${id}&showHistorical=${showHistorial}`);
  }
}
