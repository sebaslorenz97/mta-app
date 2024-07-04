/*import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

import { ProfileFormComponent } from '../../../dashboard/components/profile-form/profile-form.component'

import { AuthService } from '../../../shared/services/auth.service'*/
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router'

import { User } from '../../../shared/models/model'
import { AuthService } from '../../../shared/services/auth.service'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

import { UserFormComponent } from '../../../dashboard/components/user-form/user-form.component'
import { UserRolesFormComponent } from '../../../dashboard/components/user-roles-form/user-roles-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserFormComponent, UserRolesFormComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  userData!: User;
  userRolesData!: string[];

  private authService = inject(AuthService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if(this.renderOption() === 20){
      console.log(this.route.snapshot.data['userAndRoles']);
      this.userData = this.route.snapshot.data['userAndRoles'].ub;
      this.userRolesData = this.route.snapshot.data['userAndRoles'].roles;
      console.log('---------------- User Data ----------------');
      console.log(this.userData);
      console.log('---------------- Roles Data ----------------');
      console.log(this.userRolesData);
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
