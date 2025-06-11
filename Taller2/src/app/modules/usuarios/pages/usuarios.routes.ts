
import { Routes } from '@angular/router';
import { SigniinComponent } from './signiin/signiin.component';
import { SignupComponent } from './signup/signup.component';


export const usuariosRoutes: Routes = [

    {
        path : '',
        children : [
            {
                path : 'signiin',
                component : SigniinComponent
            },
              {
                path : 'signup',
                component : SignupComponent
            }
        ]
    }

];