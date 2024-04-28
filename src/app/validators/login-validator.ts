import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class LoginValidator {
  static hasCorrectEmail(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const regex = new RegExp(
      '^([a-zA-Z0-9+_.-]+)@([a-zA-Z0-9.-]+)(\\.)([a-z]{2,3})$'
    );
    return !regex.test(control.value)
      ? of({ hasIncorrectEmail: true })
      : of(null);
  }

  static hasCorrectPassword(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value.trim().length < 8
      ? of({ hasIncorrectPassword: true })
      : of(null);
  }
}
