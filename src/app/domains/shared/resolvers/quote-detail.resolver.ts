//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { QuoteDetailsService } from '../../shared/services/quote-details.service'

export const quoteDetailResolver: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(QuoteDetailsService).searchQuoteDetailsByQuoteId(route.paramMap.get('quoteId'));
};
