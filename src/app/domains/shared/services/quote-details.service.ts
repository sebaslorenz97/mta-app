import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { QuoteDetails, Response } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteDetailsService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/quote-and-details`;

  constructor() { }

  saveQuoteDetails(data: QuoteDetails){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewquotedetails`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

}
