import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

//Imports for Services
import { AuthService } from '../../../shared/services/auth.service';

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
  selector: 'app-login-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})


export class LoginFormComponent {

  hide = true;
  formGroup!: FormGroup;
  status = '';
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage = '';

  token='';

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    })
  }

  /*saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }*/

  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR USERNAME
    if (this.userName!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR USER PASSWORD
    if (this.userPassword!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }

  }

  //GETTERS
  get userName(){
    return this.formGroup.get('userName');
  }

  get userPassword(){
    return this.formGroup.get('userPassword');
  }

  //METHODS FOR AUTHENTICATION PROCESS
  private authService = inject(AuthService);

  loginIn(event: Event){
    console.log(this.formGroup.value)

    if(this.formGroup.valid){
      this.authService.login(this.userName?.value, this.userPassword?.value)
      .subscribe({
        next: response => {
          this.status = 'succed'
          this.router.navigate(['/dashboard-users'])
        },
        error: error => {
          this.status = 'failed'
          if(error.error != null){
            this.errorMessage = error.error.message;
          }else if(error.error == null){
            this.errorMessage = "La contraseña es invalida, rectificala"
          }
        }
      })
    }
  }

}
