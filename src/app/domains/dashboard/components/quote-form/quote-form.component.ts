import { Component, inject, ViewChild, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

//Local imports
//Components
import { CreateQuoteDTO, Quote } from '../../../shared/models/model';
//Services
import { QuoteService } from '../../../shared/services/quote.service';
import { GeneralServiceService } from '../../../shared/services/general-service.service'
//Others
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

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
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, finalize} from 'rxjs';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSlideToggleModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, AlertModalComponent, CommonModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent implements OnInit {

  //OTHER VARIABLES
  private generalServiceService = inject(GeneralServiceService);
  renderOption = this.generalServiceService.renderOption;

  //VARIABLES FOR CREATE A QUOTE
  formGroup!: FormGroup;
  errorMessage1 = 'Este campo es requerido';
  errorMessage2 = 'Campo requerido';
  errorMessage3 = 'Campo requerido';
  errorMessage4 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  //VARIABLES FOR SEARCH A QUOTE BY ID
  quoteId = new FormControl('', [Validators.required]);
  errorMessage5 = 'Este campo es requerido';

  //VARIABLES FOR SEARCH VEHICLE'S QUOTES
  vehiclePlateDos = new FormControl('', [Validators.required]);

  //VARIABLES FOR UPDATE USER
  @Input() quoteData?: Quote | undefined;
  //readonly startDate = new Date(1990, 0, 1);
  startDate?: Date;
  year?: number;
  month?: number;
  day?: number;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm()

    let observable2 = this.formGroup.statusChanges;
    let observable3 = this.formGroup.valueChanges;
    merge(observable3 as any, observable2 as any)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if(this.renderOption() === 18){
      this.quoteId!.setValue(this.quoteData!.quoteId.toString())
      this.quoteId!.disable();

      this.dateExtractor(this.quoteData!.quoteDeadline)
      this.quoteDeadline!.setValue(new Date(this.year!,this.month!,this.day!));
      this.vehiclePlate!.setValue(this.quoteData!.vehicleNameFk);
      this.quoteStatusVehicle!.setValue(this.quoteData!.quoteStatusVehicle);
      this.quotePaymentMethod!.setValue(this.quoteData!.quotePaymentMethod);
      this.quotePaymentStatus!.setValue(this.quoteData!.quotePaymentStatus);
      this.quoteRequireInvoice!.setValue(this.quoteData!.quoteRequireInvoice);
      this.quoteAdvancePayment!.setValue(this.quoteData!.quoteAdvancePayment);
      console.log(this.formGroup.value);
    }
  }

  //METHODS FOR CREATE A QUOTE'S FORMGROUP
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

  private cleanFormGroup(){
    this.formDir.resetForm();
  }

  //SERVICE METHOD FOR CREATE A QUOTE
  private quoteService = inject(QuoteService);

  saveFormGroup(event: Event){
    console.log(this.formGroup.value)
    const quote: CreateQuoteDTO = this.formGroup.value;
    const orderDate = new Date();
    quote.quoteOrderDate = this.formatDate(orderDate);
    const deadLineDate = new Date(quote.quoteDeadline);
    quote.quoteDeadline = this.formatDate(deadLineDate);
    console.log(quote)
    if(!this.quotePaymentStatus?.touched){
      quote.quotePaymentStatus = false;
    }
    if(!this.quoteRequireInvoice?.touched){
      quote.quoteRequireInvoice = false;
    }
    if(!this.quotePaymentMethod?.touched){
      quote.quotePaymentMethod = false;
    }

    this.quoteService.saveQuote(quote)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}. Cotizacion ID: ${response.qb.quoteId}, Placas del Vehiculo: ${response.qb.vehicleNameFk}, Fecha estimada de entrega: ${response.qb.quoteDeadline}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  updateQuoteById(){
    const quote: Quote = this.formGroup.value;
    quote.quoteId = this.quoteData!.quoteId;
    quote.quoteOrderDate = this.quoteData!.quoteOrderDate;
    quote.quoteDeadline = this.formatDate(new Date(quote.quoteDeadline));
    console.log(quote)

    this.quoteService.updateQuoteById(quote)
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

  deleteQuoteAndDetailsById(){
    const quote: string = this.quoteData!.quoteId.toString();
    this.quoteService.deleteQuoteAndDetailsById(quote)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}`;
          this.cleanFormGroup();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //SERVICE METHOD FOR SEARCH A QUOTE BY ID
  searchQuoteById(){
    console.log(this.quoteId)
    this.router.navigate(['dashboard/rud-quote-and-details',this.quoteId.value])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

  //SERVICE METHOD FOR SEARCH VEHICLE'S QUOTES
  searchQuotesByPlate(){
    console.log(this.vehiclePlateDos);
    this.router.navigate(['dashboard/vehicle-quotes',this.vehiclePlateDos.value])
      .catch(error => {
        this.alertMessage = error.error.message;
      })
  }

  //OTHER METHODS
  formatDate(date: Date){
    const datePart1 = date.toLocaleDateString('en-CA');
    const datePart2 = date.toLocaleString().split(',')[1].trim();
    return datePart1 + ' ' + datePart2
  }

  dateExtractor(date: string){
    this.year = parseInt(date.substring(0,4));
    this.month = parseInt(date.substring(5,7));
    if(this.month != 0){
      this.month = this.month -1;
    }
    this.day = parseInt(date.substring(8,10));
    console.log('------------------- DATE EXTRACTED ----------------')
    console.log(this.year + this.month + this.day)
  }

  //VALIDATION METHOD FOR CREATE A QUOTE
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

  //GETTERS FOR CREATE A QUOTE
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
