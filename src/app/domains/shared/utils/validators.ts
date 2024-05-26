import { AbstractControl, ValidatorFn, FormGroup, Validators, ValidationErrors } from "@angular/forms";

export class MyValidators {

  static passwordValidator:  ValidatorFn  = (control:AbstractControl):  ValidationErrors|  null  =>{
    const  password  =  control.get('userPassword');
    const  confirmpassword  =  control.get('userPasswordConfirmation');
    if(password  &&  confirmpassword  &&  password.value  !=  confirmpassword.value){
      control.get('userPasswordConfirmation')?.setErrors({invalid_match: true});
      return {
        invalid_match :  true
      }
    }
    return  null;
  }

}