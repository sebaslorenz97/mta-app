import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

//Imports for Reactive Forms
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControlStatus, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {

  formGroup!: FormGroup;

  saveFormGroup(event: Event){

  }

}
