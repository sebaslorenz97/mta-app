import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

import { CreateUserDTO } from '../../../shared/models/model';
import { GeneralServiceService } from '../../../shared/services/general-service.service'
import { UserService } from '../../../shared/services/user.service';
import { MyValidators } from '../../../shared/utils/validators';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';


//Imports for Reactive Forms
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControlStatus, FormControl, FormGroupDirective } from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [AlertModalComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit{

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  //VARIABLES FOR UPDATE PASSWORD & EMAIL
  hide = true;
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.buildForm();

    if(this.renderOption() === 21){
      this.myUserEmail!.disable();
    }

    if(this.renderOption() === 22){
      this.myCurrentUserPassword!.disable();
      this.myUserPassword!.disable();
      this.myUserPasswordConfirmation!.disable();
    }

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {

  }

  //METHODS FOR UPDATE PASSWORD & EMAIL FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      myCurrentUserPassword: ['', [Validators.required]],
      myUserPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
      myUserPasswordConfirmation: ['', [Validators.required]],
      myUserEmail: ['', [Validators.required, Validators.email]],
    },{
      validators: MyValidators.passwordValidatorForMyUser
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE METHOD FOR UPDATE PASSWORD
  private userService = inject(UserService);

  updatePassword(){
    const user: CreateUserDTO = this.formGroup.value;
    console.log(user)

    this.userService.updatePasswordForAccountOwner(user)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}`;
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  updateEmail(){
    const user: CreateUserDTO = this.formGroup.value;
    console.log(user)

    this.userService.updateEmailForAccountOwner(user)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}`;
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //VALIDATION METHOD FOR CREATE A CUSTOMER
  updateErrorMessage() {
    //UPDATE MESSAGE FOR CURRENT PASSWORD
    if (this.myCurrentUserPassword!.hasError('required')) {
      this.errorMessage4 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR NEW PASSWORD
    if (this.myUserPassword!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.myUserPassword!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa una contraseña valida';
    }

    //UPDATE MESSAGE FOR NEW PASSWORD CONFIRMATION
    if (this.myUserPasswordConfirmation!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.myUserPasswordConfirmation!.hasError('invalid_match')) {
      this.errorMessage2 = 'Las contraseñas no coinciden';
    }

    //UPDATE MESSAGE FOR NEW EMAIL
    if (this.myUserEmail!.hasError('required')) {
      this.errorMessage3 = 'Este campo es requerido';
    }else if (this.myUserEmail!.hasError('email')) {
      this.errorMessage3 = 'Porfavor ingresa un correo valido';
    }
  }

  //GETTERS FOR CREATE A CUSTOMER
  get myCurrentUserPassword(){
    return this.formGroup.get('myCurrentUserPassword');
  }

  get myUserPassword(){
    return this.formGroup.get('myUserPassword');
  }

  get myUserPasswordConfirmation(){
    return this.formGroup.get('myUserPasswordConfirmation');
  }

  get myUserEmail(){
    return this.formGroup.get('myUserEmail');
  }

}
