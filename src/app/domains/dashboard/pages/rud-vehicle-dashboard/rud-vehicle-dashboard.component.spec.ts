import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RudVehicleDashboardComponent } from './rud-vehicle-dashboard.component';

describe('RudVehicleDashboardComponent', () => {
  let component: RudVehicleDashboardComponent;
  let fixture: ComponentFixture<RudVehicleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RudVehicleDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RudVehicleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
