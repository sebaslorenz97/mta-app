import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../../../shared/components/home-navbar/home-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
