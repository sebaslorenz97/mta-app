import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RudQuoteAndDetailsDashboardComponent } from './rud-quote-and-details-dashboard.component';

describe('RudQuoteAndDetailsDashboardComponent', () => {
  let component: RudQuoteAndDetailsDashboardComponent;
  let fixture: ComponentFixture<RudQuoteAndDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RudQuoteAndDetailsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RudQuoteAndDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
