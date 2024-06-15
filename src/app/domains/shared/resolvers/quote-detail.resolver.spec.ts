import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quoteDetailResolver } from './quote-detail.resolver';

describe('quoteDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quoteDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
