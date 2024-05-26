//Other Imports
import { Component, SimpleChanges} from '@angular/core';

//Imports for Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

//Imports for Reactive Forms
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControlStatus, FormControl } from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})


export class CustomerFormComponent {

  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Campo requerido';
  errorMessage5 = 'Este campo es requerido';
  errorMessage6 = 'Este campo es requerido';
  errorMessage7 = 'Este campo es requerido';
  errorMessage8 = 'Este campo es requerido';
  errorMessage9 = 'Este campo es requerido';

  constructor(private formBuilder: FormBuilder){
    this.buildForm();

    this.customerReference!.disable();

    let observable2 = this.formGroup.statusChanges;
    //let observable2 = this.customerName!.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    //let observable3 = this.customerName!.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    /*this.customerName!.statusChanges.pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.customerName!.valueChanges.pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());*/
  }

  //METHODS FOR FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      customerParticularEmpresa: [false],
      customerReference: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      customerRfc: ['', [Validators.required, Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)]],
      customerCp: ['', [Validators.required, Validators.pattern(/^[0-9]{4,5}$/)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,13}$/)]],
      stateNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      municipalityNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    })
  }

  enableCustomerReference(){
    if(this.customerParticularEmpresa!.value === true){
      this.customerReference!.enable();
    }else{
      this.customerReference!.disable();
      this.customerReference!.setValue('');
    }
  }
  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }

  updateErrorMessage() {
    //UPDATE MESSAGE FOR CUSTOMERNAME
    if (this.customerName!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.customerName!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa un nombre valido';
    }

    //UPDATE MESSAGE FOR CUSTOMERREFERENCE
    if (this.customerReference!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }else if (this.customerReference!.hasError('pattern')) {
      this.errorMessage2 = 'Porfavor ingresa una referencia valido';
    }

    //UPDATE MESSAGE FOR CUSTOMERRFC
    if (this.customerRfc!.hasError('required')) {
      this.errorMessage3 = 'Este campo es requerido';
    }else if (this.customerRfc!.hasError('pattern')) {
      this.errorMessage3 = 'Porfavor ingresa un RFC valido';
    }

    //UPDATE MESSAGE FOR CP
    if (this.customerCp!.hasError('required')) {
      this.errorMessage4 = 'Campo requerido';
    }else if (this.customerCp!.hasError('pattern')) {
      this.errorMessage4 = 'Ingresa un CP valido';
    }

    //UPDATE MESSAGE FOR EMAIL
    if (this.customerEmail!.hasError('required')) {
      this.errorMessage5 = 'Este campo requerido';
    }else if (this.customerEmail!.hasError('email')) {
      this.errorMessage5 = 'Porfavor ingresa un email valido';
    }

    //UPDATE MESSAGE FOR PHONENUMBER
    if (this.customerPhoneNumber!.hasError('required')) {
      this.errorMessage6 = 'Este campo requerido';
    }else if (this.customerPhoneNumber!.hasError('pattern')) {
      this.errorMessage6 = 'Porfavor ingresa un telefono valido';
    }

    //UPDATE MESSAGE FOR STATENAMEFK
    if (this.stateNameFk!.hasError('required')) {
      this.errorMessage7 = 'Este campo requerido';
    }else if (this.stateNameFk!.hasError('pattern')) {
      this.errorMessage7 = 'Porfavor ingresa un estado valido';
    }

    //UPDATE MESSAGE FOR MUNICIPALITYNAMEFK
    if (this.municipalityNameFk!.hasError('required')) {
      this.errorMessage8 = 'Este campo requerido';
    }else if (this.municipalityNameFk!.hasError('pattern')) {
      this.errorMessage8 = 'Porfavor ingresa un municipio valido';
    }
  }

  //GETTERS
  get customerName(){
    return this.formGroup.get('customerName');
  }

  get customerParticularEmpresa(){
    return this.formGroup.get('customerParticularEmpresa');
  }

  get customerReference(){
    return this.formGroup.get('customerReference');
  }

  get customerRfc(){
    return this.formGroup.get('customerRfc');
  }

  get customerCp(){
    return this.formGroup.get('customerCp');
  }

  get customerEmail(){
    return this.formGroup.get('customerEmail');
  }

  get customerPhoneNumber(){
    return this.formGroup.get('customerPhoneNumber');
  }

  get stateNameFk(){
    return this.formGroup.get('stateNameFk');
  }

  get municipalityNameFk(){
    return this.formGroup.get('municipalityNameFk');
  }

}
