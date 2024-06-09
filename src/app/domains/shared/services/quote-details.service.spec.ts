import { TestBed } from '@angular/core/testing';

import { QuoteDetailsService } from './quote-details.service';

describe('QuoteDetailsService', () => {
  let service: QuoteDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
