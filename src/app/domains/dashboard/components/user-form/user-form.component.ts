import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'

//My documents
import { MyValidators } from '../../../shared/utils/validators';
import { CreateUserDTO, User } from '../../../shared/models/model';
import { UserService } from '../../../shared/services/user.service';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'
import { GeneralServiceService } from '../../../shared/services/general-service.service'

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, CommonModule, AlertModalComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  //VARIABLES FOR CREATE USER
  hide = true;
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Este campo es requerido';
  errorMessage5 = 'Este campo es requerido';
  errorMessage6 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR SEARCH USER BY NAME
  userPkDos = new FormControl('', [Validators.required]);
  errorMessage7 = 'Este campo es requerido';

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  //METHODS FOR CREATE FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      userPk: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/)]],
      userPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
      userPasswordConfirmation: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      userPosition: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userLocked: [false],
      userDisabled: [false]
    },{
      validators: MyValidators.passwordValidator
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE FOR CREATE
  private userService = inject(UserService);

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
    const user: CreateUserDTO = this.formGroup.value;
    console.log(user)
    if(!this.userLocked?.touched){
      user.userLocked = false;
    }
    if(!this.userDisabled?.touched){
      user.userDisabled = false;
    }

    this.userService.createUser(user)
      .subscribe({
        next: response => {
          console.log(response.cb)
          this.alertMessage = `${response.message}. Empleado: ${response.ub.userName}, Usuario: ${response.ub.userPk}, Correo: ${response.ub.userEmail}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE FOR SEARCH USER BY NAME
  searchUserByUser(){
    console.log(this.userPkDos)
  }

  //OTHER METHODS


  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR USER PK
    if (this.userPk!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.userPk!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa un usuario valido';
    }

    //UPDATE MESSAGE FOR USER PASSWORD
    if (this.userPassword!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.userPassword!.hasError('pattern')) {
      this.errorMessage2 = 'Porfavor ingresa una contraseña valida';
    }

    //UPDATE MESSAGE FOR CONFIRM USER PASSWORD
    if (this.userPasswordConfirmation!.hasError('required')) {
      this.errorMessage3 = 'Este campo es requerido';
    }else if(this.userPasswordConfirmation!.hasError('invalid_match')){
      this.errorMessage3 = 'Las contraseñas no coinciden';
    }


    //UPDATE MESSAGE FOR USER EMAIL
    if (this.userEmail!.hasError('required')) {
      this.errorMessage4 = 'Este campo es requerido';
    }else if (this.userEmail!.hasError('email')) {
      this.errorMessage4 = 'Porfavor ingresa un correo valido';
    }

    //UPDATE MESSAGE FOR USER NAME
    if (this.userName!.hasError('required')) {
      this.errorMessage5 = 'Este campo es requerido';
    }else if (this.userName!.hasError('pattern')) {
      this.errorMessage5 = 'Porfavor ingresa un nombre valido';
    }

    //UPDATE MESSAGE FOR USER NAME
    if (this.userPosition!.hasError('required')) {
      this.errorMessage6 = 'Este campo es requerido';
    }else if (this.userPosition!.hasError('pattern')) {
      this.errorMessage6 = 'Porfavor ingresa una posicion valida';
    }
  }

  //GETTERS
  get userPk(){
    return this.formGroup.get('userPk');
  }

  get userName(){
    return this.formGroup.get('userName');
  }

  get userPassword(){
    return this.formGroup.get('userPassword');
  }

  get userPosition(){
    return this.formGroup.get('userPosition');
  }

  get userPasswordConfirmation(){
    return this.formGroup.get('userPasswordConfirmation');
  }

  /*get userEmail1() {
    return this.formGroup.controls['userEmail'];
  }*/

  get userEmail() {
    return this.formGroup.get('userEmail');
  }

  get userLocked() {
    return this.formGroup.get('userLocked');
  }

  get userDisabled() {
    return this.formGroup.get('userDisabled');
  }

}
