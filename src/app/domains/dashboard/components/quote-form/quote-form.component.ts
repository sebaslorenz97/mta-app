import { Component } from '@angular/core';

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {provideNativeDateAdapter} from '@angular/material/core';

//Imports for Reactive Forms
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [MatSlideToggleModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent {

  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Campo requerido';
  errorMessage3 = 'Campo requerido';
  errorMessage4 = 'Este campo es requerido';

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  //FORMGROUP
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      quoteDeadline: ['', [Validators.required]],
      vehiclePlate: ['', [Validators.required]],
      quoteStatusVehicle: ['', [Validators.required]],
      quotePaymentMethod: [false],
      quotePaymentStatus: [false],
      quoteRequireInvoice: [false],
      quoteAdvancePayment: [0, [Validators.required, Validators.pattern(/^[0-9]{0,7}$/)]]
    })
  }

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
  }

  //OTHER METHODS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR VEHICLE PLATE
    if (this.vehiclePlate!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }

    //UPDATE MESSAGE FOR QUOTE DEAD LINE
    if (this.quoteDeadline!.hasError('required')) {
      this.errorMessage2 = 'Campo requerido';
    }

    //UPDATE MESSAGE FOR QUOTE STATUS VEHICLE
    if (this.quoteStatusVehicle!.hasError('required')) {
      this.errorMessage3 = 'Campo requerido';
    }

    //UPDATE MESSAGE FOR QUOTE ADVANCE PAYMENT
    if (this.quoteAdvancePayment!.hasError('required')) {
      this.errorMessage4 = 'Este campo es requerido';
    }else if (this.quoteAdvancePayment!.hasError('pattern')) {
      this.errorMessage4 = 'Porfavor ingresa una cantidad';
    }
  }

  //GETTERS
  get quoteDeadline(){
    return this.formGroup.get('quoteDeadline');
  }

  get vehiclePlate(){
    return this.formGroup.get('vehiclePlate');
  }

  get quoteStatusVehicle(){
    return this.formGroup.get('quoteStatusVehicle');
  }

  get quotePaymentMethod(){
    return this.formGroup.get('quotePaymentMethod');
  }

  get quotePaymentStatus(){
    return this.formGroup.get('quotePaymentStatus');
  }

  get quoteRequireInvoice(){
    return this.formGroup.get('quoteRequireInvoice');
  }

  get quoteAdvancePayment(){
    return this.formGroup.get('quoteAdvancePayment');
  }

}
