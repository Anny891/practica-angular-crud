import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'


interface nuevoMascotas {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota-component',
  imports: [FormsModule],
  templateUrl: './mascota-component.html',
  styleUrl: './mascota-component.css',
})
export class MascotaComponent {

  mascotas: nuevoMascotas[] = [];

  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';
  editarPosicion = -1;

  guardar(){

    if (this.nombre.trim()=='' || this.especie.trim() == '' || this.edad == null || this.propietario.trim()== ''){
      alert ('Datos incorrectos')
      return;
    }

    if (this.edad < 0 || !Number.isInteger(this.edad)){
      alert ('Verificar Datos incorrectos');
      return;
    }

    if(this.editarPosicion == -1) {
    const nuevo = {
      id: Math.max(0, ...this.mascotas.map(e => e.id)) + 1,
      nombre: this.nombre,
      especie: this.especie,
      edad: this.edad,
      propietario: this.propietario
    }
     this.mascotas.push(nuevo);
  } else {
    this.mascotas[this.editarPosicion].nombre = this.nombre;
    this.mascotas[this.editarPosicion].especie = this.especie;
    this.mascotas[this.editarPosicion].edad = this.edad;
    this.mascotas[this.editarPosicion].propietario = this.propietario;
     
  }

   
    this.limpiar();
    this.guardarEnLocalStore();
  }

  limpiar(){
    this.nombre= '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.editarPosicion = -1;
  }

  editar(i: number){
    this.editarPosicion = i;
    this.nombre = this.mascotas[i].nombre;
    this.edad = this.mascotas[i].edad;
    this.propietario= this.mascotas[i].propietario;
    this.especie = this.mascotas[i]. especie;
  }

  eliminar(i: number){
    if (confirm('¿Quieres eliminar estos datos ?')){
      this.mascotas.splice(i, 1);
      this.guardarEnLocalStore();
    }
  }

  guardarEnLocalStore(){
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
  }

  constructor (private router: Router) {
    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login'])
    }

    const datos = localStorage.getItem('mascotasVeterinaria');

    if (datos !== null){
      this.mascotas = JSON.parse(datos);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }



}
