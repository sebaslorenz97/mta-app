import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteFormComponent } from '../../../dashboard/components/quote-form/quote-form.component'
import { QuoteDetailsFormComponent } from '../../../dashboard/components/quote-details-form/quote-details-form.component'
import { SearchFormComponent } from '../../../dashboard/components/search-form/search-form.component'

import { GeneralServiceService } from '../../../shared/services/general-service.service'

@Component({
  selector: 'app-quote-and-details-dashboard',
  standalone: true,
  imports: [CommonModule, QuoteFormComponent, QuoteDetailsFormComponent, SearchFormComponent],
  templateUrl: './quote-and-details-dashboard.component.html',
  styleUrl: './quote-and-details-dashboard.component.css'
})
export class QuoteAndDetailsDashboardComponent {

  private generalServiceService = inject(GeneralServiceService);

  renderOption = this.generalServiceService.renderOption;

}
