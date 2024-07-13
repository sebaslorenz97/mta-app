import { TestBed } from '@angular/core/testing';

import { VehicleCatalogService } from './vehicle-catalog.service';

describe('VehicleCatalogService', () => {
  let service: VehicleCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
