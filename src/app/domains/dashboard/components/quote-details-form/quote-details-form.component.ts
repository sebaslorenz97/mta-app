import { Component, ChangeDetectorRef, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

//Local imports
import { QuoteDetails } from '../../../shared/models/model';
import { QuoteDetailsService } from '../../../shared/services/quote-details.service';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal/alert-modal.component'

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table'
//import {MatIconModule} from '@angular/material/icon';

//Imports for Reactive Forms
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroupDirective} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';

@Component({
  selector: 'app-quote-details-form',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatTableModule, MatButtonModule, MatInputModule, ReactiveFormsModule,/* MatIconModule,*/AlertModalComponent, CommonModule ],
  templateUrl: './quote-details-form.component.html',
  styleUrl: './quote-details-form.component.css'
})
export class QuoteDetailsFormComponent {

  quoteDetailIdFk = new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{1,4}$/)]);
  formGroup!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['quoteDetailMecId', 'quoteDetailLabour', 'quoteDetailAmount', 'delete'];
  errorMessage1 = 'Este campo es requerido';
  alertMessage: string | null = null;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  constructor(private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
      merge(this.quoteDetailIdFk!.statusChanges, this.quoteDetailIdFk?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(){

    this.formGroup = this.formBuilder.group({
      lqdb: this.formBuilder.array([],[Validators.required])
    });
  }

  //METHODS FOR FORM GROUP
  addDetail(){
    const detailForm = this.formBuilder.group({
      quoteDetailMecId: [,[Validators.required, Validators.pattern(/^[1-9]{1,2}$/)]],
      quoteDetailLabour: ['',[Validators.required]],
      quoteDetailAmount: [, [Validators.required, Validators.pattern(/^[0-9]{1,4}$/)]],
      quoteDetailIdFk:[this.quoteDetailIdFk.value]
    })

    //START: DISABLE QUOTE ID FIELD: Protects the saving of quotes details in order all the quote details have the same quote ID
    this.quoteDetailIdFk!.disable();
    //END: DISABLE QUOTE ID FIELD

    this.lqdb.push(detailForm);
    this.dataSource = new MatTableDataSource(this.lqdb.controls);
    this.cdr.detectChanges();
  }

  deleteDetail(i: number){
    this.lqdb.removeAt(i);
    console.log('DETALLE ELIMINADO: '+i)
    this.dataSource = new MatTableDataSource(this.lqdb.controls);
  }

  deleteAllDetails(){
    while (this.lqdb.length !== 0) {
      this.lqdb.removeAt(0)
      this.dataSource = new MatTableDataSource(this.lqdb.controls);
    }
  }

  private cleanAllTheForm(){
    //this.formDir.resetForm();
    this.deleteAllDetails();
    this.quoteDetailIdFk.clearAsyncValidators;
    this.quoteDetailIdFk.setValue('');
    //this.quoteDetailIdFk.reset();
    //this.quoteDetailIdFk.setErrors(null);
  }

  //METHODS FOR SERVICE
  private quoteDetailsService = inject(QuoteDetailsService);

  saveFormGroup() {
    //console.log(this.details.value);
    console.log(this.formGroup.value)
    const quoteDetails: QuoteDetails = this.formGroup.value;
    console.log(quoteDetails)
    this.quoteDetailsService.saveQuoteDetails(quoteDetails)
      .subscribe({
        next: response => {
          console.log(response)
          this.alertMessage = `${response.message}. Se guardaron detalles de la cotizacion con ID: ${response.lqdb[0].quoteDetailIdFk}`;
          //START: ENABLE QUOTE ID FIELD: AFTER THE QUOTE DETAILS FORM IS SUBMITTED THE FIELD MUST BE ENABLED AGAIN
          this.quoteDetailIdFk!.enable();
          //END: ENABLE QUOTE ID FIELD
          this.cleanAllTheForm();
        },
        error: error => {
          this.alertMessage = error.error.message;
        }
      })
  }

  //OTHER METHODS


  //METHODS FOR VALIDATIONS
  updateErrorMessage() {
    //UPDATE MESSAGE FOR QUOTE DETAIL ID
    if (this.quoteDetailIdFk!.hasError('required')) {
      this.errorMessage1 = 'Este campo es requerido';
    }else if (this.quoteDetailIdFk!.hasError('pattern')) {
      this.errorMessage1 = 'Ingresa una cotizacion valida';
    }
  }

  //GETTERS
  get lqdb(){
    return this.formGroup.controls["lqdb"] as FormArray;
  }

}
