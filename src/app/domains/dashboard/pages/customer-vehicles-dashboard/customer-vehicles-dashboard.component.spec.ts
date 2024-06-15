import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehiclesDashboardComponent } from './customer-vehicles-dashboard.component';

describe('CustomerVehiclesDashboardComponent', () => {
  let component: CustomerVehiclesDashboardComponent;
  let fixture: ComponentFixture<CustomerVehiclesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerVehiclesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerVehiclesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
