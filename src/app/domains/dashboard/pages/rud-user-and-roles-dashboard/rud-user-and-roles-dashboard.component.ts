import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { User } from '../../../shared/models/model'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

import { UserFormComponent } from '../../../dashboard/components/user-form/user-form.component'
import { UserRolesFormComponent } from '../../../dashboard/components/user-roles-form/user-roles-form.component';

@Component({
  selector: 'app-rud-user-and-roles-dashboard',
  standalone: true,
  imports: [UserFormComponent, UserRolesFormComponent, CommonModule],
  templateUrl: './rud-user-and-roles-dashboard.component.html',
  styleUrl: './rud-user-and-roles-dashboard.component.css'
})
export class RudUserAndRolesDashboardComponent implements OnInit{

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  userData!: User;
  userRolesData!: string[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.renderOption.set(11);
    console.log(this.route.snapshot.data['userAndRoles']);
    this.userData = this.route.snapshot.data['userAndRoles'].ub;
    this.userRolesData = this.route.snapshot.data['userAndRoles'].roles;
    console.log('---------------- User Data ----------------');
    console.log(this.userData);
    console.log('---------------- Roles Data ----------------');
    console.log(this.userRolesData);
    console.log(this.renderOption())
  }

}
