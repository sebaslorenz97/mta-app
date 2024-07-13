import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCatalogsDashboardComponent } from './vehicle-catalogs-dashboard.component';

describe('VehicleCatalogsDashboardComponent', () => {
  let component: VehicleCatalogsDashboardComponent;
  let fixture: ComponentFixture<VehicleCatalogsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCatalogsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleCatalogsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
