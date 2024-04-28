import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO } from 'src/api-client';
import { BuyerService } from 'src/app/services/buyer.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoginValidator } from 'src/app/validators/login-validator';
import { UpdateInformationValidator } from 'src/app/validators/update-information-validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  signupFrom!: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.signupFrom = this.formBuilder.group({
      firstName: [
        '',
        Validators.required,
        UpdateInformationValidator.hasCorrectName,
      ],
      lastName: [
        '',
        Validators.required,
        UpdateInformationValidator.hasCorrectName,
      ],
      email: ['', Validators.required, LoginValidator.hasCorrectEmail],
      address: [
        '',
        Validators.required,
        UpdateInformationValidator.hasCorrectAddress,
      ],
      password: [
        '',
        Validators.required,
        UpdateInformationValidator.hasCorrectPassword,
      ],
    });
  }

  public onSubmit() {
    this.isFormSubmitted = true;
    if (this.signupFrom.valid) {
      this.buyerService
        .createBuyer(this.signupFrom.value as BuyerDTO)
        .subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Account created successfully');
            this.router.navigate(['/login']);
          },
          error: () =>
            this.snackBarService.openSnackBar(
              "Can't create account. Check your input"
            ),
        });
      return;
    }
    this.snackBarService.openSnackBar("Can't create account. Check your input");
  }
}
