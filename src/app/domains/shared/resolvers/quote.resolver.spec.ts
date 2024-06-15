import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quoteResolver } from './quote.resolver';

describe('quoteResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quoteResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
