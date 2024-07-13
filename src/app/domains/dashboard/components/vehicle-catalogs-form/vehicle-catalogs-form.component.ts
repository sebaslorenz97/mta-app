import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

//Local imports
//Components
import { CreateVehicleLine, CreateVehicleModel, CreateVehicleYear } from '../../../shared/models/model';
//Services
import { VehicleCatalogService } from '../../../shared/services/vehicle-catalog.service';
import { GeneralServiceService } from '../../../shared/services/general-service.service'
//Others
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

//Imports for Reactive Forms
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, debounceTime} from 'rxjs';

@Component({
  selector: 'app-vehicle-catalogs-form',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, AlertModalComponent],
  templateUrl: './vehicle-catalogs-form.component.html',
  styleUrl: './vehicle-catalogs-form.component.css'
})
export class VehicleCatalogsFormComponent {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;
  alertMessage: string | null = null;
  isFirstTime: boolean = false;

  //VARIABLES FOR ADD A VEHICLE LINE
  formGroupForLine!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage5 = 'Este campo es requerido';

  //VARIABLES FOR ADD A VEHICLE MODEL
  formGroupForModel!: FormGroup;
  errorMessage2 = 'Este campo es requerido';
  errorMessage3 = 'Este campo es requerido';
  errorMessage6 = 'Este campo es requerido';

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR ADD A VEHICLE YEAR
  formGroupForYear!: FormGroup;
  errorMessage4 = 'Este campo es requerido';
  errorMessage7 = 'Este campo es requerido';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildFormForModel()
    this.buildFormForLine()
    this.buildFormForYear()

    if(this.renderOption() === 12){
      console.log('ENTRO A DESABILITAR')
      this.newVehicleModel!.disable();
      this.newVehicleLine!.disable();
      this.newVehicleYearValue!.disable();
    }

    let observable2 = this.formGroupForModel.statusChanges;
    let observable3 = this.formGroupForModel.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    let observable4 = this.formGroupForLine.statusChanges;
    let observable5 = this.formGroupForLine.valueChanges;
    merge(observable4 as any, observable5 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    let observable6 = this.formGroupForYear.statusChanges;
    let observable7 = this.formGroupForYear.valueChanges;
    merge(observable6 as any, observable7 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  //METHODS FOR CREATE A VEHICLE'S FORMGROUP
  private buildFormForModel(){
    this.formGroupForModel = this.formBuilder.group({
      vehicleModel: ['', [Validators.required]],
      newVehicleModel: ['', [Validators.required]],
      vehicleLineNameFk: ['', [Validators.required]]
    })
  }

  //METHODS FOR CREATE A VEHICLE'S FORMGROUP
  private buildFormForLine(){
    this.formGroupForLine = this.formBuilder.group({
      vehicleLine: ['', [Validators.required]],
      newVehicleLine: ['', [Validators.required]]
    })
  }

  //METHODS FOR CREATE A VEHICLE'S FORMGROUP
  private buildFormForYear(){
    this.formGroupForYear = this.formBuilder.group({
      vehicleYearValue: ['', [Validators.required]],
      newVehicleYearValue: ['', [Validators.required]]
    })
  }

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE METHOD FOR ADD A VEHICLE LINE
  private vehicleCatalogService = inject(VehicleCatalogService);

  addLine(event: Event){
    console.log(this.formGroupForLine.value)
    const vehicleLine: CreateVehicleLine = this.formGroupForLine.value;
    console.log(vehicleLine)
    this.vehicleCatalogService.saveVehicleLine(vehicleLine)
      .subscribe({
        next: response => {
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE METHOD FOR ADD A VEHICLE MODEL
  addModel(event: Event){
    console.log(this.formGroupForModel.value)
    const vehicleModel: CreateVehicleModel = this.formGroupForModel.value;
    console.log(vehicleModel)
    this.vehicleCatalogService.saveVehicleModel(vehicleModel)
      .subscribe({
        next: response => {
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE METHOD FOR ADD A VEHICLE YEAR
  addYear(event: Event){
    console.log(this.formGroupForYear.value)
    const vehicleYear: CreateVehicleYear = this.formGroupForYear.value;
    console.log(vehicleYear)
    this.vehicleCatalogService.saveVehicleYear(vehicleYear)
      .subscribe({
        next: response => {
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //VALIDATION METHOD FOR CREATE A VEHICLE
  updateErrorMessage() {
    //UPDATE MESSAGE FOR VEHICLE LINE
    if (this.vehicleLine!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }
    if (this.newVehicleLine!.hasError('required')) {
      this.errorMessage5 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR VEHICLE MODEL
    if (this.vehicleModel!.hasError('required')) {
      this.errorMessage2 = 'Este campo es requerido';
    }
    if (this.vehicleLineNameFk!.hasError('required')) {
      this.errorMessage3 = 'Este campo es requerido';
    }
    if (this.newVehicleModel!.hasError('required')) {
      this.errorMessage6 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR VEHICLE YEAR
    if (this.vehicleYearValue!.hasError('required')) {
      this.errorMessage4 = 'Campo requerido';
    }
    if (this.newVehicleYearValue!.hasError('required')) {
      this.errorMessage7 = 'Campo requerido';
    }
  }

  //GETTERS FOR CREATE A VEHICLE MODEL
  get vehicleModel(){
    return this.formGroupForModel.get('vehicleModel');
  }

  get vehicleLineNameFk(){
    return this.formGroupForModel.get('vehicleLineNameFk');
  }

  get newVehicleModel(){
    return this.formGroupForModel.get('newVehicleModel');
  }

  //GETTERS FOR CREATE A VEHICLE LINE
  get vehicleLine(){
    return this.formGroupForLine.get('vehicleLine');
  }

  get newVehicleLine(){
    return this.formGroupForLine.get('newVehicleLine');
  }

  //GETTERS FOR CREATE A VEHICLE YEAR
  get vehicleYearValue(){
    return this.formGroupForYear.get('vehicleYearValue');
  }

  get newVehicleYearValue(){
    return this.formGroupForYear.get('newVehicleYearValue');
  }
}
