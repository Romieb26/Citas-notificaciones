import { Routes } from '@angular/router';
import { CitasComponent } from './Component/Citas/Citas.component';
import { HomeComponent } from './Component/Home/Home.component';
export const routes: Routes = [
  { path: 'citas', component: CitasComponent },
{path:'home',component:HomeComponent}
];