import { Component, ViewChild, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router, RouterLinkWithHref } from '@angular/router'

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
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, CommonModule, AlertModalComponent, RouterLinkWithHref],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent implements OnInit {

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
  errorMessage8 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR SEARCH USER BY NAME
  userPkDos = new FormControl('', [Validators.required]);
  errorMessage7 = 'Este campo es requerido';

  //VARIABLES FOR SEARCH USER BY NAME
  userMecIdDos = new FormControl([Validators.required]);
  errorMessage9 = 'Este campo es requerido';

  //VARIABLES FOR UPDATE USER
  @Input() userData?: User | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();

    if(this.renderOption() === 0){
      this.userMecId!.disable();
    }

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if(this.renderOption() === 11 || this.renderOption() === 20){
      this.userPassword!.disable();
      this.userPasswordConfirmation!.disable();
      this.userPkDos!.setValue(this.userData!.userPk);
      this.userPkDos!.disable();
      //this.userMecIdDos!.setValue(this.userData!.userMecId);
      this.userMecIdDos!.disable();
      this.userMecId!.setValue(this.userData!.userMecId)
      this.userMecId!.disable();
      this.userPk!.disable();
      this.userEmail!.setValue(this.userData!.userEmail)
      this.userEmail!.disable();

      this.userName!.setValue(this.userData!.userName);
      this.userPosition!.setValue(this.userData!.userPosition);
      this.userLocked!.setValue(this.userData!.userLocked);
      this.userDisabled!.setValue(this.userData!.userDisabled);
      if(this.renderOption() === 20){
        this.userName!.disable();
        this.userPosition!.disable();
        this.userLocked!.disable();
        this.userDisabled!.disable();
      }
      console.log(this.formGroup.value);
    }
  }

  //METHODS FOR CREATE FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      userPk: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/)]],
      userPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
      userPasswordConfirmation: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      userMecId: [, [Validators.required]],
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

  //METHODS FOR UPDATE FORMGROUP


  //SERVICE FOR CREATE A USER
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
    console.log("MECANICO ID -------> "+user.userMecId)
    console.log(this.userMecId)
    console.log("-----------------------------------------")

    this.userService.createUser(user)
      .subscribe({
        next: response => {
          console.log(response.cb)
          this.alertMessage = `${response.message}. Empleado: ${response.ub.userName}, Usuario: ${response.ub.userPk}, Correo: ${response.ub.userEmail}, Mec ID: ${response.ub.userMecId}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE METHOD FOR SEARCH USER BY NAME
  searchUserByUser(){
    console.log(this.userPkDos)
    this.router.navigate(['dashboard/rud-user-and-roles/by-username',this.userPkDos.value])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

  //SERVICE METHOD FOR SEARCH USER BY NAME
  searchUserByMecId(){
    console.log(this.userMecIdDos.value)
    let userMecIdDosString = this.userMecIdDos.value!.toString();
    this.router.navigate(['dashboard/rud-user-and-roles/by-mec-id',userMecIdDosString])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

  //SERVICE FOR UPDATE BY USERNAME
  updateUserByUser(){
    const user: User = this.formGroup.value;
    user.userPk = this.userData!.userPk;
    console.log(user)

    this.userService.updateUserByUsername(user)
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

  //SERVICE FOR DELETE BY USERNAME
  deleteUserByUser(){
    const user: string = this.userData!.userPk;
    this.userService.deleteUserByUsername(user)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //ROUTER METHODS
  changePassword(){
    let user = "sebaslorenz97"
    this.renderOption.set(21)
    this.router.navigate(['dashboard/profile/password-change-form',user])
      .catch(error => {
      })
  }

  changeEmail(){
    let user = "sebaslorenz97"
    this.renderOption.set(22)
    this.router.navigate(['dashboard/profile/email-change-form',user])
      .catch(error => {
      })
  }


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

    //UPDATE MESSAGE FOR CONFIRM USER MEC ID
    /*if (this.userMecId!.hasError('required')) {
      this.errorMessage8 = 'Este campo es requerido';
    }*/


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

  get userMecId(){
    return this.formGroup.get('userMecId');
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
