import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDetailsDashboardComponent } from './quote-details-dashboard.component';

describe('QuoteDetailsDashboardComponent', () => {
  let component: QuoteDetailsDashboardComponent;
  let fixture: ComponentFixture<QuoteDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDetailsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
