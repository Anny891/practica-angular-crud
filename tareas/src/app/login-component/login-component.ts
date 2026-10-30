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

  constructor(private router: Router) {}

  ingresar() {
    if (this.usuario === 'usuario' && this.contrasena === 'tareas123') {
      localStorage.setItem('sesionTareas', 'si');
      this.router.navigate(['/tarea']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}