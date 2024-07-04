import { Component, AfterViewInit, ViewChild, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router'

//LOCAL IMPORTS
import { VehicleService } from '../../../shared/services/vehicle.service';
import { Vehicle } from '../../../shared/models/model'
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//IMPORTS FOR ANGULAR MATERIAL
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-customer-vehicles-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet, AlertModalComponent, CommonModule],
  templateUrl: './customer-vehicles-dashboard.component.html',
  styleUrl: './customer-vehicles-dashboard.component.css'
})
export class CustomerVehiclesDashboardComponent implements AfterViewInit, OnInit  {
  private vehicleService = inject(VehicleService);
  displayedColumns: string[] = ['vehiclePlate', 'vehicleColor', 'vehicleMillage', 'vehicleLineNameFk', 'vehicleModelNameFk', 'vehicleYearValueFk'];
  //vehicleData = signal<Vehicle[]>([])
  vehicleData!: Vehicle[];
  filteredVehicleData!: VehicleForTable[];
  dataSource!: MatTableDataSource<VehicleForTable>;
  clickedRows = new Set<VehicleForTable>();
  alertMessage: string | null = null;

  /*constructor(_activatedRoute: ActivatedRoute) {
    this.vehicleData.set(this.vehicleService.vehicleData());
    this.filteredVehicleData = this.vehicleData().map(({
            vehiclePlate,vehicleColor, vehicleMillage, vehicleLineNameFk, vehicleModelNameFk, vehicleYearValueFk
    })=>({
            vehiclePlate,vehicleColor, vehicleMillage, vehicleLineNameFk, vehicleModelNameFk, vehicleYearValueFk
    }))
    this.dataSource = new MatTableDataSource<VehicleForTable>(this.filteredVehicleData);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/

  constructor(private route: ActivatedRoute, private router: Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.vehicleData = this.route.snapshot.data['customerVehicles'].lvb;
    this.filteredVehicleData = this.vehicleData.map(({
      vehiclePlate,vehicleColor, vehicleMillage, vehicleLineNameFk, vehicleModelNameFk, vehicleYearValueFk
    })=>({
      vehiclePlate,vehicleColor, vehicleMillage, vehicleLineNameFk, vehicleModelNameFk, vehicleYearValueFk
    }))
    this.dataSource = new MatTableDataSource<VehicleForTable>(this.filteredVehicleData);
  }

  searchQuotesByPlate(row: VehicleForTable){
    console.log(row.vehiclePlate);
    this.router.navigate(['dashboard/vehicle-quotes',row.vehiclePlate])
      .catch(error => {
        this.alertMessage = error.error.message;
    })
  }
}

export interface VehicleForTable {
  vehiclePlate: string;
  vehicleColor: string;
  vehicleMillage: number;
  vehicleLineNameFk: string;
  vehicleModelNameFk: string;
  vehicleYearValueFk: number;
}
