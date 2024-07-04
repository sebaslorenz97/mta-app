import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateQuoteDTO, Response, Quote } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/quote-and-details`;

  constructor() { }

  //CALLS TO THE ENDPOINTSs
  saveQuote(data: CreateQuoteDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewquote`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  updateQuoteById(data: Quote){
    return this.httpClient.put<Response>(`${this.apiUrl}/editquotebyid`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  deleteQuoteAndDetailsById(quoteId: string){
    return this.httpClient.delete<Response>(`${this.apiUrl}/removequotebyid/${quoteId}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchQuoteAndDetailsById(quoteId: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getquotebyid/${quoteId}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchQuotesByPlate(vehiclePlate: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/searchvehiclequotesbyvehicleplate/${vehiclePlate}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  //DATA SHARED BETWEEN COMPONENTS
  quoteData = signal<Quote[]>([]);

}
