import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesFormComponent } from './user-roles-form.component';

describe('UserRolesFormComponent', () => {
  let component: UserRolesFormComponent;
  let fixture: ComponentFixture<UserRolesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
