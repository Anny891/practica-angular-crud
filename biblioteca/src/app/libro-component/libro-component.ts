import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro-component',
  imports: [FormsModule],
  templateUrl: './libro-component.html',
  styleUrl: './libro-component.css',
})
export class LibroComponent {

  constructor (private router: Router) {

    if (localStorage.getItem('sesionBiblioteca') !== 'si'){
      this.router.navigate(['/login']);
    };

  }

  
    cerrarSesion() {
      localStorage.removeItem('sesionBiblioteca');
      this.router.navigate(['/login']);
    }
}
