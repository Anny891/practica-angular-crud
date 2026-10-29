import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

interface nuevoEstudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante-component',
  imports: [FormsModule],
  templateUrl: './estudiante-component.html',
  styleUrl: './estudiante-component.css',
})
export class EstudianteComponent {

  estudiantes: nuevoEstudiante[] = [];



  guardarEnLocalStore(){
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
  }

  constructor (private router: Router) {

    if(localStorage.getItem('sesionEstudiantes') !== 'si'){
      this.router.navigate(['/login'])
    }

    const datos = localStorage.getItem('registrosEstudiantes')

    if (datos !== null) {
      this.estudiantes = JSON.parse(datos);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionEstudiantes')
     this.router.navigate(['/login'])
  }
}
