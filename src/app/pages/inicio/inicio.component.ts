import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { CityService } from 'src/app/Services/city.service';
import { WeatherService } from 'src/app/Services/weather.service';
import { City } from 'src/app/Models/City';
import { Weather } from 'src/app/Models/Weather';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent {
  private cityService= inject(CityService);
  private weatherService = inject(WeatherService);
  public listCity: City[] = [];
  public cityIdSelected: number = 0;
  public showHistorialCheckbox: boolean = false;
  public listWeather: Weather[] = [];
  public lastWeather: Weather = {
      id: 0,
      cityName: "",
      countryName: "",
      weather: 0,
      thermalSensation: 0
    };
  public displayedColumns: string[]=['countryName','cityName','weather','thermalSensation'];

  getCities(){
    this.cityService.getAll().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listCity = data;
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  constructor(private router:Router){
    this.getCities();
  }
  
  setShowHistorialCheckbox(checked: boolean)
  {
    this.showHistorialCheckbox = checked;
  }

  setCityIdSelected(id: number)
  {
    this.cityIdSelected = id;
  }

  getWeather(){
    if(this.cityIdSelected == 0)
    {
      alert('Seleccione una Ciudad.');
      return;
    }

    this.weatherService.getWeather(this.cityIdSelected, this.showHistorialCheckbox).subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.lastWeather = data[0];
          if(this.showHistorialCheckbox){
            this.listWeather = data;
          }
          else{
            this.listWeather = [];
          }
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  goToCities(){
    this.router.navigate(['/cities']);
  }
}



