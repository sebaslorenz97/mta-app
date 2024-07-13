import { Component, inject, ViewChild, Input, OnInit, AfterViewChecked, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

//Local imports
//Components
import { CreateVehicleDTO, Vehicle} from '../../../shared/models/model';
//Services
import { CustomerService } from '../../../shared/services/customer.service';
import { VehicleService } from '../../../shared/services/vehicle.service';
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
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, AlertModalComponent, CommonModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})


export class VehicleFormComponent implements OnInit, AfterViewChecked{

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  @Input() lines?: string[] | undefined;
  @Input() models?: string[] | undefined;
  @Input() years?: string[] | undefined;

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
  filteredOptionsForLines!:string[] | undefined;
  filteredOptionsForModels!:string[] | undefined;
  filteredOptionsForYears!:string[] | undefined;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR SEARCH A VEHICLE BY PLATE
  vehiclePlateDos = new FormControl('', [Validators.required]);
  errorMessage8 = 'Este campo es requerido';

  //VARIABLES FOR UPDATE VEHICLE
  @Input() vehicleData?: Vehicle | undefined;

  //VARIABLES FOR SEARCH CUSTOMER'S VEHICLES
  customerName = new FormControl('', [Validators.required]);
  filteredOptions!:string[] | undefined;
  initForm(){
    this.customerName.valueChanges
    .pipe(debounceTime(1500))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.searchNameOfCustomers();
    })

  }

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngAfterViewChecked(): void {
    if(this.renderOption() === 6){
      this.initForm();
      this.renderOption.set(30);
    }
  }

  ngOnInit(): void {
    if(this.lines != undefined){
      this.filteredOptionsForLines = this.lines;
    }
    if(this.models != undefined){
      this.filteredOptionsForModels = this.models;
    }
    if(this.years != undefined){
      this.filteredOptionsForYears = this.years;
    }

    if(this.renderOption() === 15){
      this.vehiclePlateDos!.setValue(this.vehicleData!.vehiclePlate);
      this.vehiclePlateDos!.disable();

      this.vehiclePlate!.setValue(this.vehicleData!.vehiclePlate);
      this.vehicleColor!.setValue(this.vehicleData!.vehicleColor);
      this.vehicleMillage!.setValue(this.vehicleData!.vehicleMillage);
      this.customerNameFk!.setValue(this.vehicleData!.customerNameFk);
      this.vehicleLineNameFk!.setValue(this.vehicleData!.vehicleLineNameFk);
      this.vehicleModelNameFk!.setValue(this.vehicleData!.vehicleModelNameFk);
      console.log('VEHICLE YEAR ----------------> '+ this.vehicleData!.vehicleYearValueFk)
      this.vehicleYearValueFk!.setValue(this.vehicleData!.vehicleYearValueFk.toString());
      console.log(this.formGroup.value);
    }
  }

  //METHODS FOR CREATE A VEHICLE'S FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      vehiclePlate: ['', [Validators.required, Validators.pattern(/^([A-Z]{3}\-[0-9]{3}\-[A-Z]{1})|([A-Z]{3}\-[0-9]{2}\-[0-9]{2})$/)]],
      vehicleColor: ['', [Validators.required]],
      vehicleMillage: ['', [Validators.required, Validators.pattern(/^[0-9]{0,6}$/)]],
      customerNameFk: ['', [Validators.required]],
      vehicleLineNameFk: ['', [Validators.required]],
      vehicleModelNameFk: ['', [Validators.required]],
      vehicleYearValueFk: [, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
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
    this.router.navigate(['dashboard/rud-vehicle',this.vehiclePlateDos.value])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

  //SERVICE METHOD FOR UPDATE BY USERNAME
  updateVehicleByPlate(){
    const vehicle: Vehicle = this.formGroup.value;
    vehicle.newVehiclePlate = this.formGroup.get('vehiclePlate')!.value;
    console.log(vehicle)

    this.vehicleService.updateVehicleByPlate(vehicle)
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

  //SERVICE METHOD FOR DELETE BY USERNAME
  deleteVehicleByPlate(){
    const vehicle: string = this.vehicleData!.vehiclePlate!;
    this.vehicleService.deleteVehicleByPlate(vehicle)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = 'No se puede eliminar porque pueden haber Cotizaciones para ese vehiculo. Si quiere eliminarlo primero elimine los elementos dependientes';
        }
      })
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

  //SERVICE METHOD FOR SEARCH CUSTOMER NAMES
  private customerService = inject(CustomerService);

  searchNameOfCustomers(){
    this.customerService.searchNameOfCustomers(this.customerName.value)
      .subscribe({
        next: response => {
          console.log(response.cl)
          this.filteredOptions = response.cl;
        }
      })
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
    }

    //UPDATE MESSAGE FOR VEHICLE MODEL
    if (this.vehicleModelNameFk!.hasError('required')) {
      this.errorMessage6 = 'Este campo es requerido';
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
