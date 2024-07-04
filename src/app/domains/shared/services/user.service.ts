import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateUserDTO, User, Response } from '../models/model'
import { devEnvironment } from '../environments/dev.environment';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = `${devEnvironment.API_URL}/user-and-roles`;
  private apiUrlForAccountOwner = `${devEnvironment.API_URL}/manager-account-owner`;

  constructor() { }

  createUser(data: CreateUserDTO){
    return this.httpClient.post<Response>(`${this.apiUrl}/savenewuser`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  updateUserByUsername(data: User){
    return this.httpClient.put<Response>(`${this.apiUrl}/edituserbyuserforadmin`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  updatePasswordForAccountOwner(data: CreateUserDTO){
    return this.httpClient.put<Response>(`${this.apiUrlForAccountOwner}/changepasswordforaccountowner`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  updateEmailForAccountOwner(data: CreateUserDTO){
    return this.httpClient.put<Response>(`${this.apiUrlForAccountOwner}/changeemailforaccountowner`, data, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  deleteUserByUsername(userPk: string){
    return this.httpClient.delete<Response>(`${this.apiUrl}/removeuserbyuser/${userPk}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
     });
  }

  searchUserAndUserRolesByUsername(userPkDos: string | null){
    let userMecId = 'search-by-username';
    return this.httpClient.get<Response>(`${this.apiUrl}/getuserbyuser/${userPkDos}/${userMecId}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchUserAndUserRolesByMecId(userMecId: string | null){
    let userPkDos = 'search-by-id-mec';
    return this.httpClient.get<Response>(`${this.apiUrl}/getuserbyuser/${userPkDos}/${userMecId}`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchUserAndUserRolesForAccountOwner(){
    return this.httpClient.get<Response>(`${this.apiUrlForAccountOwner}/getuserforaccountowner`,{
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

}
