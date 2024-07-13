import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Response, CreateVehicleLine, CreateVehicleModel, CreateVehicleYear } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleCatalogService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/vehicle-catalogs`;

  constructor() { }

  //CALLS TO THE ENDPOINTS
  saveVehicleLine(data: CreateVehicleLine){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewvehicleline`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  saveVehicleModel(data: CreateVehicleModel){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewvehiclemodel`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  saveVehicleYear(data: CreateVehicleYear){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewvehicleyear`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchVehicleLinesModelsAndYears(){
    return this.httpClient.get<Response>(`${this.apiUrl}/getvehiclelinesmodelsandyears`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

}

