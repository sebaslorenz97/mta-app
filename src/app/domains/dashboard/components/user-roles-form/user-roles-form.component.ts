import { Component } from '@angular/core';

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-user-roles-form',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './user-roles-form.component.html',
  styleUrl: './user-roles-form.component.css'
})


export class UserRolesFormComponent {

  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  //METHODS FOR FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      roleName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      roleUser: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/)]]
    })
  }

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }

  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR ROLE NAME
    if (this.roleName!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.roleName!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa un role valido';
    }

    //UPDATE MESSAGE FOR ROLE USER
    if (this.roleUser!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.roleUser!.hasError('pattern')) {
      this.errorMessage2 = 'Porfavor ingresa un usuario valido';
    }
  }

  //GETTERS
  get roleName(){
    return this.formGroup.get('roleName');
  }

  get roleUser(){
    return this.formGroup.get('roleUser');
  }

}
