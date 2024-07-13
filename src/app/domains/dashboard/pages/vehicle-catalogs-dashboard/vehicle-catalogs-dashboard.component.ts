import { Component } from '@angular/core';

import { VehicleCatalogsFormComponent } from '../../components/vehicle-catalogs-form/vehicle-catalogs-form.component'

@Component({
  selector: 'app-vehicle-catalogs-dashboard',
  standalone: true,
  imports: [VehicleCatalogsFormComponent],
  templateUrl: './vehicle-catalogs-dashboard.component.html',
  styleUrl: './vehicle-catalogs-dashboard.component.css'
})
export class VehicleCatalogsDashboardComponent {

}
