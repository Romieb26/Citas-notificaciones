import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './Component/Citas/Citas.component';
import { NotificacionesComponent } from './Component/Notificaciones/Notificaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'citas', component: CitasComponent },
  {path:'notificaciones', component:NotificacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }