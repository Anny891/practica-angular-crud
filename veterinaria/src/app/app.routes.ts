import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { MascotaComponent } from './mascota-component/mascota-component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'mascota', component: MascotaComponent},
    {path: '', redirectTo:'login', pathMatch: 'full'}
];
