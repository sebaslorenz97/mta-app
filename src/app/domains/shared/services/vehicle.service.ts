import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateVehicleDTO, Response, Vehicle } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/vehicle`;

  constructor() { }

  //CALLS TO THE ENDPOINTS
  saveVehicle(data: CreateVehicleDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewvehicle`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchVehiclesByCustomer(customer: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getcustomervehiclesbycustomername/${customer}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  //DATA SHARED BETWEEN COMPONENTS
  vehicleData = signal<Vehicle[]>([]);



}
