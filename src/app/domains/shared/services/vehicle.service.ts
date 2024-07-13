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

  updateVehicleByPlate(data: Vehicle){
    return this.httpClient.put<Response>(`${this.apiUrl}/editvehiclebyplate`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  deleteVehicleByPlate(vehiclePlateDos: string){
    return this.httpClient.delete<Response>(`${this.apiUrl}/removevehiclebyplate/${vehiclePlateDos}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchVehicleByPlate(vehiclePlateDos: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getvehiclebyplate/${vehiclePlateDos}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchCustomerVehicles(customer: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getcustomervehiclesbycustomername/${customer}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchPlateOfVehicles(vehiclePlateDos: string | null){
    return this.httpClient.get<Response>(`${this.apiUrl}/getvehiclesbystringplate/${vehiclePlateDos}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  //DATA SHARED BETWEEN COMPONENTS
  vehicleData = signal<Vehicle[]>([]);



}
