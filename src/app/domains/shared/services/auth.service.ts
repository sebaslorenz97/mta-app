import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Login } from '../models/customer.model'
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() { }

  login(userName: string, userPassword: string){
    return this.httpClient.post('http://localhost:8080/mi-taller-automotriz/auth/login', {
      userName: userName,
      userPassword: userPassword
    }, {observe: 'response'})
    .pipe(
      tap(response => this.tokenService.saveToken(response.headers.get('Authorization')!))
    );
  }

}
