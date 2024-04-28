import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  /**
   * check if it is the card with sufficient balance
   */
  public hasBalanceCard(form: FormGroup): boolean {
    return (
      form.value.cardNumber === '0000123045607890' &&
      form.value.expDate === '12/29' &&
      form.value.code === '100'
    );
  }

  /**
   * check if it is the card with insufficient balance
   */
  public hasNoBalanceCard(form: FormGroup): boolean {
    return (
      form.value.cardNumber === '0001123145617891' &&
      form.value.expDate === '12/29' &&
      form.value.code === '101'
    );
  }
}
