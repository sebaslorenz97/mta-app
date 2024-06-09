import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class VehicleDashboardComponent {

  private generalServiceService = inject(GeneralServiceService);

  renderOption = this.generalServiceService.renderOption;

}
