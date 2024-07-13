import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'

import { VehicleFormComponent } from '../../../dashboard/components/vehicle-form/vehicle-form.component'
import { SearchFormComponent } from '../../../dashboard/components/search-form/search-form.component'

import { GeneralServiceService } from '../../../shared/services/general-service.service'

@Component({
  selector: 'app-vehicle-dashboard',
  standalone: true,
  imports: [CommonModule, VehicleFormComponent, SearchFormComponent],
  templateUrl: './vehicle-dashboard.component.html',
  styleUrl: './vehicle-dashboard.component.css'
})
export class VehicleDashboardComponent implements OnInit {

  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;
  lines!: string[];
  models!: string[];
  years!: string[];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    if(this.route.snapshot.data['linesModelsAndYears'] != undefined ){
      this.lines = this.route.snapshot.data['linesModelsAndYears'].lines;
      this.models = this.route.snapshot.data['linesModelsAndYears'].models;
      this.years = this.route.snapshot.data['linesModelsAndYears'].years;
      console.log(this.lines)
      console.log(this.models)
      console.log(this.years)
    }
  }

}
