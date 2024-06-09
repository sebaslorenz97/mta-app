import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateUserDTO, Response } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/user-and-roles`;

  constructor() { }

  createUser(data: CreateUserDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewuser`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

}
