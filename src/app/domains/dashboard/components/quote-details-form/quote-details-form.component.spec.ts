import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDetailsFormComponent } from './quote-details-form.component';

describe('QuoteDetailsFormComponent', () => {
  let component: QuoteDetailsFormComponent;
  let fixture: ComponentFixture<QuoteDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
