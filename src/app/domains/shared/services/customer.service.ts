import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateCustomerDTO, Customer, Response } from '../models/model'
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

  updateCustomerByName(data: Customer){
    return this.httpClient.put<Response>(`${this.apiUrl}/editcustomerbyname`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  deleteCustomerByName(customerNameDos: string){
    return this.httpClient.delete<Response>(`${this.apiUrl}/removecustomerbyname/${customerNameDos}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchCustomerByName(customerNameDos: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getcustomerbyname/${customerNameDos}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

}
