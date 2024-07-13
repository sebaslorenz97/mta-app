import { Injectable, inject, signal } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

    //START OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT
    renderOption = signal(0);
    //END OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT

    rolesFromAuthentication = signal<string[]>([])

    saveIsAdmin(isAdmin: string){
      setCookie('isAdmin', isAdmin);
    }

    getsaveIsAdmin(){
      const isAdmin = getCookie('isAdmin');
      return isAdmin;
    }

    removeIsAdmin(){
      removeCookie('isAdmin')
    }

  constructor() { }

}
