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

  lines!: string[];
  models!: string[];
  years!: string[];
  vehicleData!: Vehicle;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.renderOption.set(15);
    this.vehicleData = this.route.snapshot.data['vehicle'].vb;
    this.lines = this.route.snapshot.data['linesModelsAndYears'].lines;
    this.models = this.route.snapshot.data['linesModelsAndYears'].models;
    this.years = this.route.snapshot.data['linesModelsAndYears'].years;
    console.log('---------------- Vehicle Data ----------------');
    console.log(this.vehicleData);
    console.log('------- Lines, Models, and Years Data --------')
    console.log(this.lines)
    console.log(this.models)
    console.log(this.years)
  }

}
