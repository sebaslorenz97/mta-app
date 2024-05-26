import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../../../shared/components/home-navbar/home-navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HomeNavbarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
