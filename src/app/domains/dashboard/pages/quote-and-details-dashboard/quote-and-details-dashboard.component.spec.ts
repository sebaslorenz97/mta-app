import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAndDetailsDashboardComponent } from './quote-and-details-dashboard.component';

describe('QuoteAndDetailsDashboardComponent', () => {
  let component: QuoteAndDetailsDashboardComponent;
  let fixture: ComponentFixture<QuoteAndDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteAndDetailsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteAndDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
