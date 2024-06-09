import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateVehicleDTO, Response } from '../models/model'
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

  saveVehicle(data: CreateVehicleDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewvehicle`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

}
