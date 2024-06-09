import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerFormComponent } from '../../../dashboard/components/customer-form/customer-form.component';
import { SearchFormComponent } from '../../../dashboard/components/search-form/search-form.component'

import { GeneralServiceService } from '../../../shared/services/general-service.service'

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, CustomerFormComponent, SearchFormComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  private generalServiceService = inject(GeneralServiceService);

  renderOption = this.generalServiceService.renderOption;

}
