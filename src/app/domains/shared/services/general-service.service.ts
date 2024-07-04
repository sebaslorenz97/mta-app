import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

    //START OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT
    renderOption = signal(0);
    //END OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT

    rolesFromAuthentication = signal<string[]>([])

  constructor() { }

}
