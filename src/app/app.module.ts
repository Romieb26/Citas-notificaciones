import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CitasService } from './Services/Citas.Services';  

@NgModule({
  imports: [BrowserModule, FormsModule], // ✅ Solo mantenemos imports
  providers: [CitasService],  // ✅ Mantenemos los servicios aquí
})
export class AppModule { }
