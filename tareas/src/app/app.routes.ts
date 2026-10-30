import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { TareaComponent } from './tarea-component/tarea-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tarea', component: TareaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
