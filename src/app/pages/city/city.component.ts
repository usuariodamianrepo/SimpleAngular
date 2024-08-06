import { Component, Input, OnInit, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/app/Services/city.service';
import { City } from 'src/app/Models/City';


@Component({
  selector: 'app-city',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit {

  @Input('id') id! : number;
  private cityServicio = inject(CityService);
  public formBuild = inject(FormBuilder);

  public formCity:FormGroup = this.formBuild.group({
    name: [''],
    description:[''],
    latitude:[0],
    longitude:[0],
    country:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.id != 0){
      this.cityServicio.getById(this.id).subscribe({
        next:(data) =>{
          this.formCity.patchValue({
            name: data.name,
            description:data.description,
            latitude:data.latitude,
            longitude:data.longitude,
            country:data.country
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  saveCity(){
    const objeto : City = {
      id : this.id,
      name: this.formCity.value.name,
      description: this.formCity.value.description,
      latitude:this.formCity.value.latitude,
      longitude:this.formCity.value.longitude,
      country:this.formCity.value.country,
    }

    if(this.id == 0){
      this.cityServicio.createCity(objeto).subscribe({
        next:(data) =>{
          if(data.id > 0){
            this.router.navigate(["/cities"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }else{
      this.cityServicio.editCity(objeto.id, objeto).subscribe({
        next:(data) =>{
          if(data.id > 0){
            this.router.navigate(["/cities"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  goBack(){
    this.router.navigate(["/cities"]);
  }

}

