import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { Vehicle } from '../../../shared/models/model'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

import { VehicleFormComponent } from '../../../dashboard/components/vehicle-form/vehicle-form.component'

@Component({
  selector: 'app-rud-vehicle-dashboard',
  standalone: true,
  imports: [VehicleFormComponent, CommonModule],
  templateUrl: './rud-vehicle-dashboard.component.html',
  styleUrl: './rud-vehicle-dashboard.component.css'
})
export class RudVehicleDashboardComponent implements OnInit{

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  vehicleData!: Vehicle;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.renderOption.set(15);
    console.log(this.route.snapshot.data['vehicle']);
    this.vehicleData = this.route.snapshot.data['vehicle'].vb;
    console.log('---------------- Vehicle Data ----------------');
    console.log(this.vehicleData);
  }

}
