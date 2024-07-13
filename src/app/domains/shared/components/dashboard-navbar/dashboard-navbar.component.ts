import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router'

//Others
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

import { GeneralServiceService } from '../../../shared/services/general-service.service'
import { VehicleCatalogService } from '../../../shared/services/vehicle-catalog.service';


@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, AlertModalComponent],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})


export class DashboardNavbarComponent {

  private generalServiceService = inject(GeneralServiceService);
  rolesFromAuthentication = this.generalServiceService.rolesFromAuthentication;
  alertMessage: string | null = null;
  isAdmin!: string | undefined;

  constructor(private router: Router){
    this.isAdmin = this.generalServiceService.getsaveIsAdmin();
  }

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

  //FOR VEHICLE CATALOGS
  changeRenderOptionCreateVehicleCatalog(){
    this.generalServiceService.renderOption.set(12)
  }

  changeRenderOptionSearchVehicleCatalog(){
    this.generalServiceService.renderOption.set(14)
  }

  //SERVICE METHOD FOR SEARCH VEHICLE LINES, MODELS AND YEARS
  searchVehiclesByCustomer(){
    this.changeRenderOptionCreateVehicle()
    this.router.navigate(['dashboard/vehicle-lmy'])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

}
