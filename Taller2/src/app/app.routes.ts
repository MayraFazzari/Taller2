import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ProductosComponent } from './public/productos/productos.component';
import { CarritoComponent } from './public/carrito/carrito.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent
    },
    {
        path : 'usuarios',
        loadChildren : ()=>import('./modules/usuarios/pages/usuarios.routes').then( u => u.usuariosRoutes)
    },
    {
      path: 'productos',
      component: ProductosComponent
    },
    {
      path: 'carrito',
      component: CarritoComponent
    },
    {
        path : '**',
        redirectTo : 'home'
    }

];
