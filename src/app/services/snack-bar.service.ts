import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', { duration: 3000 });
  }
}
