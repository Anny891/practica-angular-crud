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

  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';

  guardar(){
    if (this.cuenta.trim()== '' || this.nombre.trim() == '' || this.carrera.trim() == '' || this.fechaIngreso.trim() == ''){
      alert ('Datos Incompletos')
      return;
    }

    const nuevoEstudiante = {
      id: Math.max(0, ...this.estudiantes.map(e => e.id)) + 1,
      cuenta: this.cuenta,
      nombre: this.nombre,
      carrera: this.carrera,
      fechaIngreso:  this.fechaIngreso

    }

    this.estudiantes.push(nuevoEstudiante);
    this.limpiar();
    this.guardarEnLocalStore();
  }

  limpiar(){
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
  }


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
