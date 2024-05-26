import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'

//My documents
import { MyValidators } from '../../../shared/utils/validators';

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {

  hide = true;
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Este campo es requerido';

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
      userName: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/)]],
      userPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
      userPasswordConfirmation: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]]
    },{
      validators: MyValidators.passwordValidator
    })
  }

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }

  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR USERNAME
    if (this.userName!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.userName!.hasError('pattern')) {
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
    console.log(this.formGroup)

    //UPDATE MESSAGE FOR USER EMAIL
    if (this.userEmail!.hasError('required')) {
      this.errorMessage4 = 'Este campo es requerido';
    }else if (this.userEmail!.hasError('email')) {
      this.errorMessage4 = 'Porfavor ingresa un correo valido';
    }
  }

  testMethod(){
    console.log('HOLAAAAAAAAAAAAAAAAA')
  }

  //GETTERS
  get userName(){
    return this.formGroup.get('userName');
  }

  get userPassword(){
    return this.formGroup.get('userPassword');
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

}
