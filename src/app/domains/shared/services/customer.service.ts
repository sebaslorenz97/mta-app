import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateCustomerDTO, Response } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/customer`;

  constructor() { }

  saveCustomer(data: CreateCustomerDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewcustomer`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

}
