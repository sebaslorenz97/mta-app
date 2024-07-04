import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { Response } from '../models/model'
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() { }

  login(userName: string, userPassword: string){
    return this.httpClient.post<Response>('http://localhost:8080/mi-taller-automotriz/auth/login', {
      userPk: userName,
      userPassword: userPassword
    }, {observe: 'response'})
    .pipe(
      tap(response => this.tokenService.saveToken(response.headers.get('Authorization')!))
    );
  }

  logout(){
    this.tokenService.removeToken();
  }

}
