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
  editarPosicion = -1;

  guardar(){
    if (this.cuenta.trim()== '' || this.nombre.trim() == '' || this.carrera.trim() == '' || this.fechaIngreso.trim() == ''){
      alert ('Datos Incompletos')
      return;
    }

    if ( this.editarPosicion == -1) {
    const nuevoEstudiante = {
      id: Math.max(0, ...this.estudiantes.map(e => e.id)) + 1,
      cuenta: this.cuenta,
      nombre: this.nombre,
      carrera: this.carrera,
      fechaIngreso:  this.fechaIngreso
      }
      this.estudiantes.push(nuevoEstudiante);
    } else {
        this.estudiantes[this.editarPosicion].cuenta = this.cuenta;
        this.estudiantes[this.editarPosicion].nombre = this.nombre;
        this.estudiantes[this.editarPosicion].carrera = this.carrera;
        this.estudiantes[this.editarPosicion].fechaIngreso = this.fechaIngreso;
      }


    
    this.limpiar();
    this.guardarEnLocalStore();
  }

  limpiar(){
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
    this.editarPosicion = -1
  }

  editar(i: number) {
    this.editarPosicion = i;
    this.cuenta = this.estudiantes[i].cuenta;
    this.nombre = this.estudiantes[i].nombre
    this.carrera = this.estudiantes[i].carrera;
    this.fechaIngreso = this.estudiantes[i].fechaIngreso
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
