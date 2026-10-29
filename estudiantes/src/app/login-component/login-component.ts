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
  contrasena= '';

  constructor ( private router: Router) {}

  ingresar(){
    if (this.usuario == 'registro' && this.contrasena == 'alumnos123'){
      localStorage.setItem('sesionEstudiantes', 'si');
      this.router.navigate(['/estudiantes']);
    }
     else {
    alert ('Datos incorrecto !!!')
  }
  }
 
}
