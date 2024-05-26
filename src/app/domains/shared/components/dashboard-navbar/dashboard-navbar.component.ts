import { Component, inject } from '@angular/core';

import { GeneralServiceService } from '../../../shared/services/general-service.service'


@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})


export class DashboardNavbarComponent {

  private generalServiceService = inject(GeneralServiceService);

  changeRenderOptionToCustomer(){
    this.generalServiceService.renderOption.set(0)
  }

  changeRenderOptionToQuote(){
    this.generalServiceService.renderOption.set(2)
  }

  changeRenderOptionToVehicle(){
    this.generalServiceService.renderOption.set(3)
  }

  changeRenderOptionToUserAndRoles(){
    this.generalServiceService.renderOption.set(4)
  }

  changeRenderOptionToSearchUserAndRoles(){
    this.generalServiceService.renderOption.set(1);
    this.generalServiceService.model.set('Usuario');
    this.generalServiceService.action.set('Buscar');
  }

  changeRenderOptionToSearchCustomer(){
    this.generalServiceService.renderOption.set(1);
    this.generalServiceService.model.set('Cliente');
    this.generalServiceService.action.set('Buscar');
  }

  changeRenderOptionToSearchQuoteByCustomerName(){
    this.generalServiceService.renderOption.set(1);
    this.generalServiceService.model.set('Nombre del Cliente');
    this.generalServiceService.action.set('Buscar');
  }

  changeRenderOptionToSearchQuoteByPlate(){
    this.generalServiceService.renderOption.set(1);
    this.generalServiceService.model.set('Placa');
    this.generalServiceService.action.set('Buscar');
  }

  changeRenderOptionToSearchVehicle(){
    this.generalServiceService.renderOption.set(1);
    this.generalServiceService.model.set('Vehiculo');
    this.generalServiceService.action.set('Buscar');
  }

  changeRenderOptionToDeleteUserAndRoles(){
    this.generalServiceService.action.set('Eliminar');
  }

  changeRenderOptionToDeleteCustomer(){
    this.generalServiceService.action.set('Eliminar');
  }

  changeRenderOptionToDeleteQuoteByCustomerName(){
    this.generalServiceService.model.set('Nombre del Cliente');
    this.generalServiceService.action.set('Eliminar');
  }

  changeRenderOptionToDeleteQuoteByPlate(){
    this.generalServiceService.model.set('Placa');
    this.generalServiceService.action.set('Eliminar');
  }

  changeRenderOptionToDeleteVehicle(){
    this.generalServiceService.action.set('Eliminar');
  }

}
