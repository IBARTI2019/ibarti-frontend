import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export class MatchValidator {
  constructor() { }
  public TextControl(controlName: string, textAdd: string | string[]) {
    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];
      if (control.errors && !control.errors.TextControl) {
        return;
      }
      if (typeof textAdd === 'object') {

        if (textAdd.indexOf(control.value) >= 0) {
          control.setErrors({ TextControl: true });
        } else {
          control.setErrors(null);
        }
      } else {
        if (control.value === textAdd) {
          control.setErrors({ TextControl: true });
        } else {
          control.setErrors(null);
        }
      }

    };
  }
  public ControlValidator(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.ControlValidator) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ ControlValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}


