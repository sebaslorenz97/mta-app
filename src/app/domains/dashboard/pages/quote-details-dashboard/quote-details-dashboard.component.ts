import { Component, AfterViewInit, ViewChild, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { QuoteDetailsService } from '../../../shared/services/quote-details.service';
import { QuoteDetail } from '../../../shared/models/model'

//IMPORTS FOR ANGULAR MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-quote-details-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, RouterOutlet],
  templateUrl: './quote-details-dashboard.component.html',
  styleUrl: './quote-details-dashboard.component.css'
})
export class QuoteDetailsDashboardComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['quoteDetailMecId', 'quoteDetailLabour', 'quoteDetailAmount'];
  quoteDetailsData!: QuoteDetail[];
  filteredQuoteDetailsData!: QuoteDetailForTable[];
  dataSource!: MatTableDataSource<QuoteDetailForTable>;
  quote!: string;

  constructor(private route: ActivatedRoute) {
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.quote = this.route.snapshot.data['quoteDetails'].quote;
    this.quoteDetailsData = this.route.snapshot.data['quoteDetails'].lqdb;
    this.filteredQuoteDetailsData = this.quoteDetailsData.map(({
      quoteDetailMecId,quoteDetailLabour, quoteDetailAmount
    })=>({
      quoteDetailMecId,quoteDetailLabour, quoteDetailAmount
    }))
    this.dataSource = new MatTableDataSource<QuoteDetailForTable>(this.filteredQuoteDetailsData);
  }

}

export interface QuoteDetailForTable {
  quoteDetailMecId: number,
  quoteDetailLabour: string,
  quoteDetailAmount: number,
}
