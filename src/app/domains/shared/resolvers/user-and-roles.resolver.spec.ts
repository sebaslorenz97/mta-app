import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userAndRolesResolver } from './user-and-roles.resolver';

describe('userAndRolesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userAndRolesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
