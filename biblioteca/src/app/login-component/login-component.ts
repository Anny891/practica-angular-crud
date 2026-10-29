import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

    if (this.usuario == 'bibliotecario' && this.contrasena == 'biblio123'){
      localStorage.setItem('sesionBiblioteca', 'si');
      this.router.navigate(['/libro']);
    }
    else {
      alert ('Contraseña o usuario incorrecto!!!!')
    }

  }
}
