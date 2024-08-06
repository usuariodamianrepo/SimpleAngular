import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { City } from '../Models/City';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})

export class CityService {
  private http=inject(HttpClient);
  private apiUrl = appsettings.apiUrl + "City";

  constructor() { }

  getAll(){
    return this.http.get<City[]>(this.apiUrl);
  }

  getById(id:number){
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }

  createCity(city:City){
    return this.http.post<ResponseAPI>(this.apiUrl,city);
  }

  editCity(id: number, city:City){
    return this.http.put<ResponseAPI>(`${this.apiUrl}/${id}`,city);
  }

  deleteCity(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
