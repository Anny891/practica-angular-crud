import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface nuevaTarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea-component',
  imports: [FormsModule],
  templateUrl: './tarea-component.html',
  styleUrl: './tarea-component.css',
})

export class TareaComponent {

  tareas: nuevaTarea[] = [];
  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente';

  guardar() {
  if (this.titulo.trim() === '' || this.descripcion.trim() === '' || this.fechaLimite === '') {
    alert('Datos incompletos');
    return;
  }

  if (this.estado !== 'Pendiente' && this.estado !== 'Completada') {
    alert('Estado incorrecto');
    return;
  }

  const nueva = {
    id: Math.max(0, ...this.tareas.map(e => e.id)) + 1,
    titulo: this.titulo,
    descripcion: this.descripcion,
    fechaLimite: this.fechaLimite,
    estado: this.estado
  };

  this.tareas.push(nueva);
  this.limpiar();
  this.guardarEnLocalStore();
}

limpiar() {
  this.titulo = '';
  this.descripcion = '';
  this.fechaLimite = '';
  this.estado = 'Pendiente';
}

  guardarEnLocalStore() {
    localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  }

  constructor(private router: Router) {
    if (localStorage.getItem('sesionTareas') !== 'si') {
      this.router.navigate(['/login']);
    }

    const datos = localStorage.getItem('agendaTareas');

    if (datos !== null) {
      this.tareas = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}