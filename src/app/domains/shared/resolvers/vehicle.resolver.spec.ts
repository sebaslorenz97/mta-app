import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { vehicleResolver } from './vehicle.resolver';

describe('vehicleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => vehicleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
