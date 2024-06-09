import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

import { GeneralServiceService } from '../../../shared/services/general-service.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatCheckboxModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {

  private generalServiceService = inject(GeneralServiceService);

  model = this.generalServiceService.model;

}
