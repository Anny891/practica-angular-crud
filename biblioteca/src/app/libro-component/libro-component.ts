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
  editarPosicion = -1;

  
  guardar(){
    if (this.codigo.trim() == '' || this.titulo.trim() == '' || this.autor.trim() == '' || this.anio === null) {
      alert ('Datos incorrectos')
      return;
    }

    if (this.anio < 1000 || this.anio > 9999  || !Number.isInteger(this.anio)) {
      alert ('Rango malos')
      return;
    }

    if (this.editarPosicion === -1) {
    const nuevo = {
      id: Math.max(0, ...this.libros.map(e => e.id)) + 1,
      codigo: this.codigo,
      titulo: this.titulo,
      autor: this.autor,
      anio: this.anio
    }
    this.libros.push(nuevo);

  }
  else {
      this.libros[this.editarPosicion].autor = this.autor;
      this.libros[this.editarPosicion].codigo = this.codigo;
      this.libros[this.editarPosicion].titulo = this.titulo;
      this.libros[this.editarPosicion].anio = this.anio;
    }

    
    this.limpiar();
    this.guardarEnLocalStore();
    this.editarPosicion = -1;


  }

  limpiar () {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
    this.editarPosicion = -1;
  }

  editar (i:number){
    this.editarPosicion = i;
    this.codigo = this.libros[i].codigo;
    this.titulo = this.libros[i].titulo;
    this.autor = this.libros[i].autor;
    this.anio = this.libros[i].anio;
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
