import { Component, ViewChild, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

//My documents
import { UserRole } from '../../../shared/models/model';
import { UserRolesService } from '../../../shared/services/user-roles.service';
import { GeneralServiceService } from '../../../shared/services/general-service.service'
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-user-roles-form',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule, AlertModalComponent, MatCheckboxModule],
  templateUrl: './user-roles-form.component.html',
  styleUrl: './user-roles-form.component.css'
})


export class UserRolesFormComponent implements OnInit {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  //VARIABLES FOR ASSIGN USER'S ROLES
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR ASSIGN AND UNASSIGN USER'S ROLES
  @Input() user?: string | undefined;
  @Input() userRolesData?: string[] | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if(this.renderOption() === 11 || this.renderOption() === 20){
      this.userPkFk!.setValue(this.user);
      this.userPkFk!.disable();

      if(this.userRolesData != null){
        if(this.userRolesData![0] != undefined){
          this.adminRole!.setValue(true);
        }
        if(this.userRolesData![1] != undefined){
          this.employeeRole!.setValue(true);
        }
        if(this.userRolesData![2] != undefined){
          this.managerRole!.setValue(true);
        }
      }
      if(this.renderOption()===20){
        this.adminRole!.disable();
        this.employeeRole!.disable();
        this.managerRole!.disable();
      }
      console.log(this.formGroup.value);
    }
  }

  //METHODS FOR ASSIGN USER'S ROLES FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      userPkFk: ['', [Validators.required]],
      adminRole: [false],
      employeeRole: [false],
      managerRole: [false]
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE FOR ASSIGN USER'S ROLES
  private userRolesService = inject(UserRolesService);

  saveFormGroup(event: Event){
    let userRole: UserRole = this.formGroup.value;

    if(this.user != undefined){
      userRole.userPkFk = this.user!;
    }

    if(this.userRolesData != undefined){
      if(!this.adminRole!.touched && this.userRolesData![0] != undefined){
        userRole.adminRole = true;
      }
      if(!this.employeeRole!.touched && this.userRolesData![1] != undefined){
        userRole.managerRole = true;
      }
      if(!this.managerRole!.touched && this.userRolesData![2] != undefined){
        userRole.employeeRole = true;
      }
    }

    const orderDate = new Date();
    userRole.roleUserGrantedDate = this.formatDate(orderDate);

    console.log(userRole);

    this.userRolesService.assignUserRole(userRole)
      .subscribe({
        next: response => {
          if(response.roleAssignmentOperationResult != ''){
            this.alertMessage = `${response.roleAssignmentOperationResult}`;
          }else{
            this.alertMessage = 'No hubo cambios en los roles'
          }
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
    //UPDATE MESSAGE FOR ROLE USER
    if (this.userPkFk!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.userPkFk!.hasError('pattern')) {
      this.errorMessage2 = 'Porfavor ingresa un usuario valido';
    }
  }

  //GETTERS
  get userPkFk(){
    return this.formGroup.get('userPkFk');
  }

  get adminRole(){
    return this.formGroup.get('adminRole');
  }

  get employeeRole(){
    return this.formGroup.get('employeeRole');
  }

  get managerRole(){
    return this.formGroup.get('managerRole');
  }

}
