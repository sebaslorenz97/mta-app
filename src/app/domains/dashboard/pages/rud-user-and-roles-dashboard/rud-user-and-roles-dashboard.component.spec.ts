import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RudUserAndRolesDashboardComponent } from './rud-user-and-roles-dashboard.component';

describe('RudUserAndRolesDashboardComponent', () => {
  let component: RudUserAndRolesDashboardComponent;
  let fixture: ComponentFixture<RudUserAndRolesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RudUserAndRolesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RudUserAndRolesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
