import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { Quote, QuoteDetail } from '../../../shared/models/model'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

import { QuoteFormComponent } from '../../../dashboard/components/quote-form/quote-form.component'
import { QuoteDetailsFormComponent } from '../../../dashboard/components/quote-details-form/quote-details-form.component';

@Component({
  selector: 'app-rud-quote-and-details-dashboard',
  standalone: true,
  imports: [QuoteFormComponent, QuoteDetailsFormComponent, CommonModule],
  templateUrl: './rud-quote-and-details-dashboard.component.html',
  styleUrl: './rud-quote-and-details-dashboard.component.css'
})
export class RudQuoteAndDetailsDashboardComponent {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  quoteData!: Quote;
  detailsData!: QuoteDetail[];
  quoteAndDetails!: Response;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.renderOption.set(18);
    this.quoteData = this.route.snapshot.data['quoteAndDetails'].qb;
    this.detailsData = this.route.snapshot.data['quoteAndDetails'].lqdb;
    console.log('---------------- User Data ----------------');
    console.log(this.quoteData);
    console.log('---------------- Roles Data ----------------');
    console.log(this.detailsData);
  }

}
