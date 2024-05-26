import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNavbarComponent } from '../../../shared/components/dashboard-navbar/dashboard-navbar.component';
import { SearchFormComponent } from '../../../dashboard/components/search-form/search-form.component';
import { UserFormComponent } from '../../../dashboard/components/user-form/user-form.component'
import { UserRolesFormComponent } from '../../../dashboard/components/user-roles-form/user-roles-form.component';
import { CustomerFormComponent } from '../../../dashboard/components/customer-form/customer-form.component';
import { QuoteFormComponent } from '../../../dashboard/components/quote-form/quote-form.component'
import { QuoteDetailsFormComponent } from '../../../dashboard/components/quote-details-form/quote-details-form.component'
import { VehicleFormComponent } from '../../../dashboard/components/vehicle-form/vehicle-form.component'

import { Customer } from '../../../shared/models/customer.model';
import { GeneralServiceService } from '../../../shared/services/general-service.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardNavbarComponent, UserFormComponent, UserRolesFormComponent, CustomerFormComponent, QuoteFormComponent, SearchFormComponent, QuoteDetailsFormComponent, VehicleFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  private generalServiceService = inject(GeneralServiceService);

  renderOption = this.generalServiceService.renderOption;

  customer = signal<Customer>({
    stateNameFk: "Queretaro",
    municipalityNameFk: "El Marques",
    customerName: "Fernando Ortega",
    customerParticularEmpresa: false,
    customerReference:"",
    customerRfc: "LOSD971126",
    customerCp: "32233",
    customerEmail: "fernando.ort.98gmail.com",
    customerPhoneNumber: "4425337687"
  });

  receiveCustomerInfoHandler(customer: Customer){
    console.log('Info recibida desde padre');
    //customer();
  }

}