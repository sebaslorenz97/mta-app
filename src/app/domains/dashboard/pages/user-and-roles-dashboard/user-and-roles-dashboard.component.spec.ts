import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndRolesDashboardComponent } from './user-and-roles-dashboard.component';

describe('UserAndRolesDashboardComponent', () => {
  let component: UserAndRolesDashboardComponent;
  let fixture: ComponentFixture<UserAndRolesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAndRolesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAndRolesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
