import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserRole, Response } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/user-and-roles`;

  constructor() { }

  assignUserRole(data: UserRole){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewuserrole`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

}
