//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { VehicleService } from '../../shared/services/vehicle.service'

export const vehicleResolver: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(VehicleService).searchVehiclesByCustomer(route.paramMap.get('customerName'));
};
