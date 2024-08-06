import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CityService } from 'src/app/Services/city.service';
import { City } from 'src/app/Models/City';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {
  private cityService= inject(CityService);
  public listCity:City[] = [];
  public displayedColumns: string[]=['id','name','description','latitude','longitude','country','accion'];

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

  goToWether(){
    this.router.navigate(['']);
  }

  newCity(){
    this.router.navigate(['/city',0]);
  }

  editCity(objeto:City){
    this.router.navigate(['/city',objeto.id]);
  }

  deleteCity(objeto:City){
    if(confirm("Desea eliminar la ciudad " + objeto.name)){
      this.cityService.deleteCity(objeto.id).subscribe({
        next:(data)=>{
          if(data){
            this.getCities();
          }else{
            alert("No se pudo eliminar la ciudad " + objeto.name);
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }
}
