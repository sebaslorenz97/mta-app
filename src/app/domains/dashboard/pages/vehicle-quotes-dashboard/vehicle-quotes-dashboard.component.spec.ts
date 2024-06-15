import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleQuotesDashboardComponent } from './vehicle-quotes-dashboard.component';

describe('VehicleQuotesDashboardComponent', () => {
  let component: VehicleQuotesDashboardComponent;
  let fixture: ComponentFixture<VehicleQuotesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleQuotesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleQuotesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
