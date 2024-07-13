import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCatalogsFormComponent } from './vehicle-catalogs-form.component';

describe('VehicleCatalogsFormComponent', () => {
  let component: VehicleCatalogsFormComponent;
  let fixture: ComponentFixture<VehicleCatalogsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCatalogsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleCatalogsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
