import { Component } from '@angular/core';

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';


@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})


export class VehicleFormComponent {

  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Este campo es requerido';
  errorMessage5 = 'Este campo es requerido';
  errorMessage6 = 'Este campo es requerido';
  errorMessage7 = 'Campo requerido';

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
      vehiclePlate: ['', [Validators.required, Validators.pattern(/^([A-Z]{3}\-[0-9]{3}\-[A-Z]{1})|([A-Z]{3}\-[0-9]{2}\-[0-9]{2})$/)]],
      vehicleColor: ['', [Validators.required]],
      vehicleMillage: ['', [Validators.required, Validators.pattern(/^[0-9]{0,6}$/)]],
      customerIdFk: ['', [Validators.required]],
      vehicleLineNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      vehicleModelNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      vehicleYearValueFk: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    })
  }

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }

  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR VEHICLE PLATE
    if (this.vehiclePlate!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.vehiclePlate!.hasError('pattern')) {
      this.errorMessage1 = 'Porfavor ingresa una placa valida';
    }

    //UPDATE MESSAGE FOR VEHICLE COLOR
    if (this.vehicleColor!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR VEHICLE MILLAGE
    if (this.vehicleMillage!.hasError('required')) {
      this.errorMessage3 = 'Este campo es requerido';
    }else if (this.vehicleMillage!.hasError('pattern')) {
      this.errorMessage3 = 'Porfavor ingresa un kilometraje valido';
    }

    //UPDATE MESSAGE FOR CUSTOMER ID FK
    if (this.customerIdFk!.hasError('required')) {
      this.errorMessage4 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR VEHICLE LINE
    if (this.vehicleLineNameFk!.hasError('required')) {
      this.errorMessage5 = 'Este campo es requerido';
    }else if (this.vehicleLineNameFk!.hasError('pattern')) {
      this.errorMessage5 = 'Porfavor ingresa una marca valida';
    }

    //UPDATE MESSAGE FOR VEHICLE MODEL
    if (this.vehicleModelNameFk!.hasError('required')) {
      this.errorMessage6 = 'Este campo es requerido';
    }else if (this.vehicleModelNameFk!.hasError('pattern')) {
      this.errorMessage6 = 'Porfavor ingresa un modelo valido';
    }

    //UPDATE MESSAGE FOR VEHICLE YEAR
    if (this.vehicleYearValueFk!.hasError('required')) {
      this.errorMessage7 = 'Campo requerido';
    }else if (this.vehicleYearValueFk!.hasError('pattern')) {
      this.errorMessage7 = 'Año invalido';
    }
  }

  //GETTERS
  get vehiclePlate(){
    return this.formGroup.get('vehiclePlate');
  }

  get vehicleColor(){
    return this.formGroup.get('vehicleColor');
  }

  get vehicleMillage(){
    return this.formGroup.get('vehicleMillage');
  }

  get customerIdFk(){
    return this.formGroup.get('customerIdFk');
  }

  get vehicleLineNameFk(){
    return this.formGroup.get('vehicleLineNameFk');
  }

  get vehicleModelNameFk(){
    return this.formGroup.get('vehicleModelNameFk');
  }

  get vehicleYearValueFk(){
    return this.formGroup.get('vehicleYearValueFk');
  }

}
