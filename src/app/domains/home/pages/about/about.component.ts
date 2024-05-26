import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../../../shared/components/home-navbar/home-navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HomeNavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
