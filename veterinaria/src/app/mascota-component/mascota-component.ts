import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-mascota-component',
  imports: [FormsModule],
  templateUrl: './mascota-component.html',
  styleUrl: './mascota-component.css',
})
export class MascotaComponent {

  constructor (private router: Router) {
    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login'])
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }



}
