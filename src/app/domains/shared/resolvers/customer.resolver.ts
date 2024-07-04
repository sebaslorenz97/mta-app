//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { CustomerService } from '../../shared/services/customer.service'

export const customerResolver: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(CustomerService).searchCustomerByName(route.paramMap.get('customerNameDos'));
};
