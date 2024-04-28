import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  constructor() {}

  formatDate(localsArgument: string) {
    const date = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString(localsArgument, options);
  }
}
