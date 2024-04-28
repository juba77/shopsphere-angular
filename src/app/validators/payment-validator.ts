import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class PaymentValidator {
  static hasCorrectCardNumber(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value !== '0000123045607890' &&
      control.value !== '0001123145617891'
      ? of({ hasIncorrectCardNumber: true })
      : of(null);
  }

  static hasCorrectExpDate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value !== '12/29'
      ? of({ hasIncorrectExpDate: true })
      : of(null);
  }

  static hasCorrectCode(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.value !== '100' && control.value !== '101'
      ? of({ hasIncorrectCode: true })
      : of(null);
  }
}
