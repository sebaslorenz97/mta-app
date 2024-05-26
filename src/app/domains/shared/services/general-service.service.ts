import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

    //START OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT
    renderOption = signal(5);
    model = signal('Cliente');
    action = signal('Buscar');
    modelTwo = signal('');
    actionTwo = signal('');
    //END OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT

  constructor() { }
}
