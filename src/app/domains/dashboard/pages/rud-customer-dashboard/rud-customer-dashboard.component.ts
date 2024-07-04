import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { Customer } from '../../../shared/models/model'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

import { CustomerFormComponent } from '../../../dashboard/components/customer-form/customer-form.component'

@Component({
  selector: 'app-rud-customer-dashboard',
  standalone: true,
  imports: [CustomerFormComponent, CommonModule],
  templateUrl: './rud-customer-dashboard.component.html',
  styleUrl: './rud-customer-dashboard.component.css'
})
export class RudCustomerDashboardComponent implements OnInit {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  customerData!: Customer;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.renderOption.set(13);
    console.log(this.route.snapshot.data['customer']);
    this.customerData = this.route.snapshot.data['customer'].cb;
    console.log('---------------- Customer Data ----------------');
    console.log(this.customerData);
  }

}
