import { Component, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { GeneralServiceService } from '../../../shared/services/general-service.service'


@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})


export class DashboardNavbarComponent {

  private generalServiceService = inject(GeneralServiceService);

  //FOR USER AND ROLES
  changeRenderOptionCreateUserRoles(){
    this.generalServiceService.renderOption.set(0)
  }

  changeRenderOptionSearchUserByName(){
    this.generalServiceService.renderOption.set(1)
  }

  changeRenderOptionSearchUserByMecId(){
    this.generalServiceService.renderOption.set(10)
  }

  //FOR CUSTOMER
  changeRenderOptionCreateCustomer(){
    this.generalServiceService.renderOption.set(2)
  }

  changeRenderOptionSearchCustomerByName(){
    this.generalServiceService.renderOption.set(3)
  }

  //FOR VEHICLE
  changeRenderOptionCreateVehicle(){
    this.generalServiceService.renderOption.set(4)
  }

  changeRenderOptionSearchVehicleByPlate(){
    this.generalServiceService.renderOption.set(5)
  }

  changeRenderOptionSearchVehiclesByCustomer(){
    this.generalServiceService.renderOption.set(6)
  }

  //FOR QUOTE AND DETAILS
  changeRenderOptionCreateQuoteDetails(){
    this.generalServiceService.renderOption.set(7)
  }

  changeRenderOptionSearchQuoteById(){
    this.generalServiceService.renderOption.set(8)
  }

  changeRenderOptionSearchQuotesByVehicle(){
    this.generalServiceService.renderOption.set(9)
  }

}
