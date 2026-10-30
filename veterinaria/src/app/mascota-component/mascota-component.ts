import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'


interface nuevoMascotas {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota-component',
  imports: [FormsModule],
  templateUrl: './mascota-component.html',
  styleUrl: './mascota-component.css',
})
export class MascotaComponent {

  mascotas: nuevoMascotas[] = [];


  guardarEnLocalStore(){
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
  }

  constructor (private router: Router) {
    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login'])
    }

    const datos = localStorage.getItem('mascotasVeterinaria');

    if (datos !== null){
      this.mascotas = JSON.parse(datos);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }



}
