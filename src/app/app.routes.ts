import { Routes } from '@angular/router';
import { HomeComponent } from '../app/domains/home/pages/home/home.component'
import { AboutComponent } from '../app/domains/home/pages/about/about.component'
import { ContactComponent } from '../app/domains/home/pages/contact/contact.component'

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
  }
];
