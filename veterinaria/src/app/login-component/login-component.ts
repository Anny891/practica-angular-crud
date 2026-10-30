import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  usuario = '';
  contrasena = '';

  constructor (private router: Router) {}

  ingresar(){
    if (this.usuario == 'veterinario' && this.contrasena == 'mascotas123') {
      localStorage.setItem('sesionVeterinaria', 'si');
      this.router.navigate(['/mascota']);
    }
    else {
      alert ('Los datos estan incorrectos !!!')
    }
  }
}
