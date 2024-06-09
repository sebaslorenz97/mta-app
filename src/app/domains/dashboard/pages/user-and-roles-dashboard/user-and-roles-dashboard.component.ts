import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from '../../../dashboard/components/user-form/user-form.component'
import { UserRolesFormComponent } from '../../../dashboard/components/user-roles-form/user-roles-form.component';
import { SearchFormComponent } from '../../../dashboard/components/search-form/search-form.component'

import { GeneralServiceService } from '../../../shared/services/general-service.service'

@Component({
  selector: 'app-user-and-roles-dashboard',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserRolesFormComponent, SearchFormComponent],
  templateUrl: './user-and-roles-dashboard.component.html',
  styleUrl: './user-and-roles-dashboard.component.css'
})
export class UserAndRolesDashboardComponent {

  private generalServiceService = inject(GeneralServiceService);

  renderOption = this.generalServiceService.renderOption;

}
