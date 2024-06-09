import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common'

//My documents
import { UserRole } from '../../../shared/models/model';
import { UserRolesService } from '../../../shared/services/user-roles.service';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-user-roles-form',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule, AlertModalComponent],
  templateUrl: './user-roles-form.component.html',
  styleUrl: './user-roles-form.component.css'
})


export class UserRolesFormComponent {

  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

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
      roleUserPk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      userPkFk: ['', [Validators.required]]
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //METHODS FOR SERVICE
  private userRolesService = inject(UserRolesService);

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
    const userRole: UserRole = this.formGroup.value;

    const orderDate = new Date();
    userRole.roleUserGrantedDate = this.formatDate(orderDate);
    console.log(userRole);

    this.userRolesService.assignUserRole(userRole)
      .subscribe({
        next: response => {
          console.log(response.cb)
          this.alertMessage = `${response.message}. El role: ${response.urb.roleUserPk} fue asignado al usuario ${response.urb.userPkFk}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //OTHER METHODS
  formatDate(date: Date){
    const datePart1 = date.toLocaleDateString('en-CA');
    const datePart2 = date.toLocaleString().split(',')[1].trim();
    return datePart1 + ' ' + datePart2
  }

  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR ROLE NAME
    if (this.roleUserPk!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.roleUserPk!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa un role valido';
    }

    //UPDATE MESSAGE FOR ROLE USER
    if (this.userPkFk!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.userPkFk!.hasError('pattern')) {
      this.errorMessage2 = 'Porfavor ingresa un usuario valido';
    }
  }

  //GETTERS
  get roleUserPk(){
    return this.formGroup.get('roleUserPk');
  }

  get userPkFk(){
    return this.formGroup.get('userPkFk');
  }

}
