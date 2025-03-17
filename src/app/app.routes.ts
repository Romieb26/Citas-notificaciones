import { Routes } from '@angular/router';
import { CitasComponent } from './Component/Citas/Citas.component';
import { HomeComponent } from './Component/Home/Home.component';
import { AdminComponent } from './Component/Admin/Admin.component';
import { LoginComponent } from './Component/Login/Login.component';

export const routes: Routes = [
  { path: 'citas', component: CitasComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];