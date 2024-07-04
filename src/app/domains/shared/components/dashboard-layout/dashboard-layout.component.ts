import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'
import { RouterLinkWithHref } from '@angular/router';

import { DashboardNavbarComponent } from '../../../shared/components/dashboard-navbar/dashboard-navbar.component';

import { GeneralServiceService } from '../../../shared/services/general-service.service';
import { AuthService } from '../../../shared/services/auth.service'

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [DashboardNavbarComponent, RouterOutlet, RouterLinkWithHref],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;
  private authService = inject(AuthService);
  user: string = 'sebaslorenz97';

  constructor(private router: Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  searchMyProfile(){
    this.renderOption.set(20);
    this.router.navigate(['dashboard/profile-info'])
      .catch(error => {
        console.log(error.error)
      })
  }

}
