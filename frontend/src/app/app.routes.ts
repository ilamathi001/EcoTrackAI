import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CarbonForm } from './components/carbon-form/carbon-form';
import { ProfileComponent } from './profile/profile';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'dashboard',
    component: CarbonForm
  },

  {
    path: 'profile',
    component: ProfileComponent
  }

];