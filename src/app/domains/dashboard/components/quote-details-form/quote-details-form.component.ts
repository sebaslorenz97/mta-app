import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

//Imports for Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table'
//import {MatIconModule} from '@angular/material/icon';

//Imports for Reactive Forms
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';

//Imports for RXJS
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, mergeWith, Observable} from 'rxjs';

@Component({
  selector: 'app-quote-details-form',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatTableModule, MatButtonModule, MatInputModule, ReactiveFormsModule/*, MatIconModule*/],
  templateUrl: './quote-details-form.component.html',
  styleUrl: './quote-details-form.component.css'
})
export class QuoteDetailsFormComponent {

  quoteDetailIdFk = new FormControl(0,[Validators.required, Validators.pattern(/^[1-9]{1,4}$/)]);
  formGroup!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['quoteDetailMecId', 'quoteDetailLabour', 'quoteDetailAmount', 'delete'];
  errorMessage1 = 'Este campo es requerido';


  constructor(private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {
      merge(this.quoteDetailIdFk!.statusChanges, this.quoteDetailIdFk?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(){

    this.formGroup = this.formBuilder.group({
      details: this.formBuilder.array([])
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

    this.details.push(detailForm);
    this.dataSource = new MatTableDataSource(this.details.controls);
    this.cdr.detectChanges();
  }

  deleteDetail(i: number){
    this.details.removeAt(i);
    this.dataSource = new MatTableDataSource(this.details.controls);
  }

  saveFormGroup() {
    console.log(this.details.value);
  }

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
  get details(){
    return this.formGroup.controls["details"] as FormArray;
  }

}
