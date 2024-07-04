import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RudCustomerDashboardComponent } from './rud-customer-dashboard.component';

describe('RudCustomerDashboardComponent', () => {
  let component: RudCustomerDashboardComponent;
  let fixture: ComponentFixture<RudCustomerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RudCustomerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RudCustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
