
import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


export const usuariosRoutes: Routes = [

    {
        path : '',
        children : [
            {
                path : 'signin',
                component : SigninComponent
            },
              {
                path : 'signup',
                component : SignupComponent
            }
        ]
    }

];