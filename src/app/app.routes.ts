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
import { RudUserAndRolesDashboardComponent } from '../app/domains/dashboard/pages/rud-user-and-roles-dashboard/rud-user-and-roles-dashboard.component'
import { RudCustomerDashboardComponent } from '../app/domains/dashboard/pages/rud-customer-dashboard/rud-customer-dashboard.component'
import { RudVehicleDashboardComponent } from '../app/domains/dashboard/pages/rud-vehicle-dashboard/rud-vehicle-dashboard.component'
import { RudQuoteAndDetailsDashboardComponent } from '../app/domains/dashboard/pages/rud-quote-and-details-dashboard/rud-quote-and-details-dashboard.component'
import { ProfileFormComponent } from '../app/domains/dashboard/components/profile-form/profile-form.component'
import { VehicleCatalogsDashboardComponent } from '../app/domains/dashboard/pages/vehicle-catalogs-dashboard/vehicle-catalogs-dashboard.component'

//IMPORTS FOR GUARDS
import { authGuard } from '././domains/shared/guards/auth.guard'
import { redirectGuard } from '././domains/shared/guards/redirect.guard'
//IMPORTS FOR RESOLVERS
import { vehicleResolverForSearchCustomerVehicles, vehicleResolverForSearchVehicleByPlate, vehicleResolverForSearchVehicleLinesModelsAndYears } from './domains/shared/resolvers/vehicle.resolver'
import { quoteResolver } from './domains/shared/resolvers/quote.resolver'
import { quoteDetailResolver } from './domains/shared/resolvers/quote-detail.resolver'
import { userAndRolesResolverByUsername, userAndRolesResolverByMecId, userAndRolesResolverForAccountOwner } from './domains/shared/resolvers/user-and-roles.resolver'
import { customerResolver } from './domains/shared/resolvers/customer.resolver'
import { quoteAndDetailsResolver } from './domains/shared/resolvers/quote.resolver'

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
      //PROFILE ROUTES
      {
        path: 'profile-info',
        //canActivate: [ authGuard ],
        component: DashboardComponent,
        resolve: {
          userAndRoles: userAndRolesResolverForAccountOwner
        }
      },
      {
        path: 'profile/password-change-form/:userPkDos',
        //canActivate: [ authGuard ],
        component: ProfileFormComponent
      },
      {
        path: 'profile/email-change-form/:userPkDos',
        //canActivate: [ authGuard ],
        component: ProfileFormComponent
      },


      //ROUTES FOR CREATE
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
        path: 'vehicle-lmy',
        //canActivate: [ redirectGuard ],
        component: VehicleDashboardComponent,
        resolve: {
          linesModelsAndYears: vehicleResolverForSearchVehicleLinesModelsAndYears
        }
      },
      {
        path: 'quote-and-details',
        //canActivate: [ authGuard ],
        component: QuoteAndDetailsDashboardComponent
      },
      {
        path: 'vehicle-catalogs',
        //canActivate: [ redirectGuard ],
        component: VehicleCatalogsDashboardComponent
      },


      //ROUTES FOR READ, UPDATE AND DELETE
      {
        path: 'rud-user-and-roles/by-username/:userPkDos',
        //canActivate: [ redirectGuard ],
        component: RudUserAndRolesDashboardComponent,
        resolve: {
          userAndRoles: userAndRolesResolverByUsername
        }
      },
      {
        path: 'rud-user-and-roles/by-mec-id/:userMecIdDosString',
        //canActivate: [ redirectGuard ],
        component: RudUserAndRolesDashboardComponent,
        resolve: {
          userAndRoles: userAndRolesResolverByMecId
        }
      },
      {
        path: 'rud-customer/:customerNameDos',
        //canActivate: [ redirectGuard ],
        component: RudCustomerDashboardComponent,
        resolve: {
          customer: customerResolver
        }
      },
      {
        path: 'rud-vehicle/:vehiclePlateDos',
        //canActivate: [ redirectGuard ],
        component: RudVehicleDashboardComponent,
        resolve: {
          vehicle: vehicleResolverForSearchVehicleByPlate,
          linesModelsAndYears: vehicleResolverForSearchVehicleLinesModelsAndYears
        }
      },
      {
        path: 'rud-quote-and-details/:quoteId',
        //canActivate: [ redirectGuard ],
        component: RudQuoteAndDetailsDashboardComponent,
        resolve: {
          quoteAndDetails: quoteAndDetailsResolver
        }
      },


      //ROUTES FOR JOINS
      {
        path: 'customer-vehicles/:customerName',
        //canActivate: [ redirectGuard ],
        component: CustomerVehiclesDashboardComponent,
        resolve: {
          customerVehicles: vehicleResolverForSearchCustomerVehicles
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
