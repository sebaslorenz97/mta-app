import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    var expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
    setCookie('token', token, { expires: expirationTime, path: '/'  });
  }

  getToken(){
    const token = getCookie('token');
    return token;
  }

  removeToken(){
    removeCookie('token')
  }

}
