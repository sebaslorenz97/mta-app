import { Routes } from '@angular/router';
//IMPORTS FOR PAGES
import { DashboardLayoutComponent } from '../app/domains/shared/components/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from '../app/domains/home/pages/home/home.component'
import { AboutComponent } from '../app/domains/home/pages/about/about.component'
import { ContactComponent } from '../app/domains/home/pages/contact/contact.component'
import { LoginComponent } from '../app/domains/auth/pages/login/login.component'
import { DashboardComponent } from '../app/domains/dashboard/pages/dashboard/dashboard.component'
import { UserAndRolesDashboardComponent } from '../app/domains/dashboard/pages/user-and-roles-dashboard/user-and-roles-dashboard.component'
import { CustomerDashboardComponent } from '../app/domains/dashboard/pages/customer-dashboard/customer-dashboard.component'
import { VehicleDashboardComponent } from '../app/domains/dashboard/pages/vehicle-dashboard/vehicle-dashboard.component'
import { QuoteAndDetailsDashboardComponent } from '../app/domains/dashboard/pages/quote-and-details-dashboard/quote-and-details-dashboard.component'
import { CustomerVehiclesDashboardComponent } from '../app/domains/dashboard/pages/customer-vehicles-dashboard/customer-vehicles-dashboard.component'
import { VehicleQuotesDashboardComponent } from '../app/domains/dashboard/pages/vehicle-quotes-dashboard/vehicle-quotes-dashboard.component'
import { QuoteDetailsDashboardComponent } from '../app/domains/dashboard/pages/quote-details-dashboard/quote-details-dashboard.component'
//IMPORTS FOR GUARDS
import { authGuard } from '././domains/shared/guards/auth.guard'
import { redirectGuard } from '././domains/shared/guards/redirect.guard'
//IMPORTS FOR RESOLVERS
import { vehicleResolver } from './domains/shared/resolvers/vehicle.resolver'
import { quoteResolver } from './domains/shared/resolvers/quote.resolver'
import { quoteDetailResolver } from './domains/shared/resolvers/quote-detail.resolver'

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
    canActivate: [ redirectGuard ],
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [ authGuard ],
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'profile',
        //canActivate: [ authGuard ],
        component: DashboardComponent
      },
      {
        path: 'user-and-roles',
        //canActivate: [ authGuard ],
        component: UserAndRolesDashboardComponent
      },
      {
        path: 'customer',
        //canActivate: [ authGuard ],
        component: CustomerDashboardComponent
      },
      {
        path: 'vehicle',
        //canActivate: [ authGuard ],
        component: VehicleDashboardComponent,
      },
      {
        path: 'quote-and-details',
        //canActivate: [ authGuard ],
        component: QuoteAndDetailsDashboardComponent
      },
      {
        path: 'customer-vehicles/:customerName',
        //canActivate: [ redirectGuard ],
        component: CustomerVehiclesDashboardComponent,
        resolve: {
          customerVehicles: vehicleResolver
        }
      },
      {
        path: 'vehicle-quotes/:vehiclePlateDos',
        //canActivate: [ redirectGuard ],
        component: VehicleQuotesDashboardComponent,
        resolve: {
          vehicleQuotes: quoteResolver
        }
      },
      {
        path: 'quote-details/:quoteId',
        //canActivate: [ redirectGuard ],
        component: QuoteDetailsDashboardComponent,
        resolve: {
          quoteDetails: quoteDetailResolver
        }
      }
    ]
  },
];
