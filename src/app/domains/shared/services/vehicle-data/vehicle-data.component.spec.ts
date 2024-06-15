import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDataComponent } from './vehicle-data.component';

describe('VehicleDataComponent', () => {
  let component: VehicleDataComponent;
  let fixture: ComponentFixture<VehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
