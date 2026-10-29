import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { EstudianteComponent } from './estudiante-component/estudiante-component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'estudiantes', component: EstudianteComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'}
];
