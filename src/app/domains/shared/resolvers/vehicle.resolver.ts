//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { VehicleService } from '../../shared/services/vehicle.service'

export const vehicleResolverForSearchCustomerVehicles: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(VehicleService).searchCustomerVehicles(route.paramMap.get('customerName'));
};

export const vehicleResolverForSearchVehicleByPlate: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(VehicleService).searchVehicleByPlate(route.paramMap.get('vehiclePlateDos'));
};
