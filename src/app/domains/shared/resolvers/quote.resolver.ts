//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { QuoteService } from '../../shared/services/quote.service'

export const quoteResolver: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(QuoteService).searchQuotesByPlate(route.paramMap.get('vehiclePlateDos'));
};
