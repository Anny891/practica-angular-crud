import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface nuevoLibro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;

}

@Component({
  selector: 'app-libro-component',
  imports: [FormsModule],
  templateUrl: './libro-component.html',
  styleUrl: './libro-component.css',
})
export class LibroComponent {

  libros : nuevoLibro[]= [];

  guardarEnLocalStore () {
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
  }

  constructor (private router: Router) {

    if (localStorage.getItem('sesionBiblioteca') !== 'si'){
      this.router.navigate(['/login']);
    };

    const datos = localStorage.getItem('librosBiblioteca')

    if (datos !== null) {
    this.libros = JSON.parse(datos);
    }

  }

  
    cerrarSesion() {
      localStorage.removeItem('sesionBiblioteca');
      this.router.navigate(['/login']);
    }
}
