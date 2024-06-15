import { Component, AfterViewInit, ViewChild, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router'

import { QuoteDetailsService } from '../../../shared/services/quote-details.service';
import { Quote } from '../../../shared/models/model'

//IMPORTS FOR ANGULAR MATERIAL
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-vehicle-quotes-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet],
  templateUrl: './vehicle-quotes-dashboard.component.html',
  styleUrl: './vehicle-quotes-dashboard.component.css'
})
export class VehicleQuotesDashboardComponent implements AfterViewInit, OnInit{

  private quoteDetailsService = inject(QuoteDetailsService);

  displayedColumns: string[] = ['quoteId', 'quoteOrderDate', 'quoteDeadline', 'quoteStatusVehicle', 'quotePaymentMethod', 'quotePaymentStatus','quoteRequireInvoice','quoteAdvancePayment'];
  quoteData!: Quote[];
  filteredQuoteData!: QuoteForTable[];
  dataSource!: MatTableDataSource<QuoteForTable>;
  clickedRows = new Set<QuoteForTable>();
  alertMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.quoteData = this.route.snapshot.data['vehicleQuotes'].lqb;
    this.filteredQuoteData = this.quoteData.map(({
      quoteId,quoteOrderDate, quoteDeadline, quoteStatusVehicle, quotePaymentMethod, quotePaymentStatus, quoteRequireInvoice, quoteAdvancePayment
    })=>({
      quoteId,quoteOrderDate, quoteDeadline, quoteStatusVehicle, quotePaymentMethod, quotePaymentStatus, quoteRequireInvoice, quoteAdvancePayment
    }))
    this.dataSource = new MatTableDataSource<QuoteForTable>(this.filteredQuoteData);
  }

  searchQuoteDetailsByQuoteId(row: QuoteForTable){
    console.log(row.quoteId);
    this.router.navigate(['dashboard/quote-details',row.quoteId])
      .catch(error => {
        this.alertMessage = error.error.message;
    })
  }

}

export interface QuoteForTable {
  quoteId: number;
  quoteOrderDate: string;
  quoteDeadline: string;
  quoteStatusVehicle: string;
  quotePaymentMethod: boolean;
  quotePaymentStatus: boolean;
  quoteRequireInvoice: boolean;
  quoteAdvancePayment: string;
}
