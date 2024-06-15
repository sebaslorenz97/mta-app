import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

//Local imports
//Components
import { CreateVehicleDTO } from '../../../shared/models/model';
//Services
import { VehicleService } from '../../../shared/services/vehicle.service';
import { GeneralServiceService } from '../../../shared/services/general-service.service'
//Others
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, finalize} from 'rxjs';


@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, AlertModalComponent, CommonModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})


export class VehicleFormComponent {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  //VARIABLES FOR CREATE A VEHICLE
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage4 = 'Este campo es requerido';
  errorMessage5 = 'Este campo es requerido';
  errorMessage6 = 'Este campo es requerido';
  errorMessage7 = 'Campo requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR SEARCH A VEHICLE BY PLATE
  vehiclePlateDos = new FormControl('', [Validators.required]);
  errorMessage8 = 'Este campo es requerido';

  //VARIABLES FOR SEARCH CUSTOMER'S VEHICLES
  customerName = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  //METHODS FOR CREATE A VEHICLE'S FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      vehiclePlate: ['', [Validators.required, Validators.pattern(/^([A-Z]{3}\-[0-9]{3}\-[A-Z]{1})|([A-Z]{3}\-[0-9]{2}\-[0-9]{2})$/)]],
      vehicleColor: ['', [Validators.required]],
      vehicleMillage: ['', [Validators.required, Validators.pattern(/^[0-9]{0,6}$/)]],
      customerNameFk: ['', [Validators.required]],
      vehicleLineNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      vehicleModelNameFk: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      vehicleYearValueFk: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE METHOD FOR CREATE A VEHICLE
  private vehicleService = inject(VehicleService);

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
    const vehicle: CreateVehicleDTO = this.formGroup.value;
    console.log(vehicle)
    this.vehicleService.saveVehicle(vehicle)
      .subscribe({
        next: response => {
          console.log(response.cb)
          this.alertMessage = `${response.message}. Vehiculo ID: ${response.vb.vehicleId}, Placa: ${response.vb.vehiclePlate}, Color: ${response.vb.vehicleColor}, Marca: ${response.vb.vehicleLineNameFk}, Modelo: ${response.vb.vehicleModelNameFk}, Dueño: ${response.vb.customerNameFk}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE METHOD FOR SEARCH A VEHICLE BY PLATE
  searchVehicleByPlate(){
    console.log(this.vehiclePlateDos);
  }

  //SERVICE METHOD FOR SEARCH CUSTOMER'S VEHICLES
  searchVehiclesByCustomer(){
    console.log(this.customerName.value);
    this.router.navigate(['dashboard/customer-vehicles',this.customerName.value])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
    /*this.vehicleService.searchVehiclesByCustomer(this.customerName?.value)
      .pipe(finalize(() => {
        this.router.navigate(['/dashboard/customer-vehicles']);
      }))
      .subscribe({
        next: response => {
          //console.log(response.lvb)
          this.vehicleService.vehicleData.set(response.lvb);
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })*/
  }

  //VALIDATION METHOD FOR CREATE A VEHICLE
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
    if (this.customerNameFk!.hasError('required')) {
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

  //GETTERS FOR CREATE A VEHICLE
  get vehiclePlate(){
    return this.formGroup.get('vehiclePlate');
  }

  get vehicleColor(){
    return this.formGroup.get('vehicleColor');
  }

  get vehicleMillage(){
    return this.formGroup.get('vehicleMillage');
  }

  get customerNameFk(){
    return this.formGroup.get('customerNameFk');
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
