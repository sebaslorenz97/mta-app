import { Routes } from '@angular/router';
import { HomeComponent } from '../app/domains/home/pages/home/home.component'
import { AboutComponent } from '../app/domains/home/pages/about/about.component'
import { ContactComponent } from '../app/domains/home/pages/contact/contact.component'
import { LoginComponent } from '../app/domains/auth/pages/login/login.component'
import { DashboardComponent } from '../app/domains/dashboard/pages/dashboard/dashboard.component'
import { authGuard } from '././domains/shared/guards/auth.guard'
import { redirectGuard } from '././domains/shared/guards/redirect.guard'


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    //canActivate: [ redirectGuard ],
    component: LoginComponent
  },
  {
    path: 'dashboard-users',
    //canActivate: [ authGuard ],
    component: DashboardComponent
  }
];
