import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface nuevoProducto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencia: number;
}

@Component({
  selector: 'app-producto-component',
  imports: [FormsModule],
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.css',
})
export class ProductoComponent {

  productos: nuevoProducto[] = []

  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencia: number | null = null;
  editarPosicion = -1;

  guardar(){
    if (this.codigo.trim() == '' || this.nombre.trim()=='' || this.precio == null || this.existencia == null){
      alert ('Datos incompletos !!!');
      return;
    }

    if (this.precio <= 0 || this.existencia < 0 || !Number.isInteger(this.precio) || !Number.isInteger(this.existencia)) {
      alert ('Datos Equivocados !!!!')
      return;
    }

    if (this.editarPosicion == -1){
    const nuevo = {
      id: Math.max(0, ...this.productos.map(e => e.id)) + 1,
      codigo: this.codigo,
      nombre: this.nombre,
      precio: this.precio,
      existencia: this.existencia
    }
    this.productos.push(nuevo);
  } else {
    this.productos[this.editarPosicion].codigo = this.codigo;
    this.productos[this.editarPosicion].nombre = this.nombre;
    this.productos[this.editarPosicion].precio = this.precio;
    this.productos[this.editarPosicion].existencia = this.existencia
  }

    
    this.limpiar();
    this.guardarEnLocalStore();
    this.editarPosicion = -1;

  }

  limpiar(){
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencia = null;
    this.editarPosicion = -1
  }

  editar (i:number) {
    this.editarPosicion = i;
    this.codigo = this.productos[i].codigo;
    this.nombre = this.productos[i].nombre;
    this.precio = this.productos[i].precio;
    this.existencia = this.productos[i].existencia;
  }

  guardarEnLocalStore(){
    localStorage.setItem('productosTienda', JSON.stringify(this.productos))
  }

  constructor (private router: Router) {
    if (localStorage.getItem('sesionTienda') !== 'si'){
      this.router.navigate(['/login'])
    }
    const datos = localStorage.getItem('productosTienda')

    if (datos !== null) {
      this.productos = JSON.parse(datos);
    }
  }

  

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login'])
  }
}
