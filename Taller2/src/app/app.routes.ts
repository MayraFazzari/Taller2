import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent
    },

    {
        path : '**',
        redirectTo : 'home'
    },

     {
        path : 'usuarios',
        loadChildren : ()=>import('./modules/usuarios/pages/usuarios.routes').then( u => u.usuariosRoutes)
    }
];
