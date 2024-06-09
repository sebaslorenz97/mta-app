import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

    //START OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT
    renderOption = signal(0);
    renderOptionForUserRoles = signal(0);
    renderOptionForCustomer = signal(0);
    renderOptionForVehicle = signal(0);
    renderOptionForQuoteDetails = signal(0);

    renderOptionForAddressCatalogs = signal(0);
    renderOptionForVehicleCatalogs = signal(0);

    model = signal('');
    //END OF LOGIC RELATED WITH DASHBOARD NAVBAR COMPONENT

  constructor() { }

}
