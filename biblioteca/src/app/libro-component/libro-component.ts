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

  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;

  
  guardar(){
    if (this.codigo.trim() == '' || this.titulo.trim() == '' || this.autor.trim() == '' || this.anio === null) {
      alert ('Datos incorrectos')
      return;
    }

    if (this.anio < 1000 || this.anio > 9999  || !Number.isInteger(this.anio)) {
      alert ('Rango malos')
      return;
    }

    const nuevo = {
      id: Math.max(0, ...this.libros.map(e => e.id)) + 1,
      codigo: this.codigo,
      titulo: this.titulo,
      autor: this.autor,
      anio: this.anio
    }

    this.libros.push(nuevo);
    this.limpiar();
    this.guardarEnLocalStore();

  }

  limpiar () {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
  }

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
