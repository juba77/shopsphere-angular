import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class UpdateInformationValidator {
  static hasCorrectAddress(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value.trim().length < 3
      ? of({ hasIncorrectAddress: true })
      : of(null);
  }

  static hasCorrectPassword(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value.trim().length < 8
      ? of({ hasIncorrectPassword: true })
      : of(null);
  }

  static hasCorrectName(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const regex = new RegExp('^[a-zA-Z-]+$');
    return !regex.test(control.value) || control.value.trim().length < 3
      ? of({ hasIncorrectName: true })
      : of(null);
  }
}
