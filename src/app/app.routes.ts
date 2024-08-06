import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { CityComponent } from './pages/city/city.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'cities',component:CitiesComponent},
    {path:'city/:id',component:CityComponent},
];

