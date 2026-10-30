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

  tareas: nuevaTarea[] = [
    {
    id: 1,
    titulo: 'Repasar Angular',
    descripcion: 'Practicar ngModel',
    fechaLimite: '2026-11-02',
    estado: 'Pendiente'
  },
  {
    id: 2,
    titulo: 'Leer apuntes',
    descripcion: 'Revisar componentes',
    fechaLimite: '2026-11-03',
    estado: 'Completada'
  }
  ];


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