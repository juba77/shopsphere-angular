import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO, RoleEnum, UserConnectedDTO } from 'src/api-client';
import { BuyerService } from 'src/app/services/buyer.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UpdateInformationValidator } from 'src/app/validators/update-information-validator';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss'],
})
export class UserUpdateFormComponent implements OnInit {
  userUpdateForm!: FormGroup;
  isFormSubmitted: boolean = false;
  role = RoleEnum;
  @Input() user!: UserConnectedDTO;

  constructor(
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.user.role === RoleEnum.Admin) {
      this.userUpdateForm = this.formBuilder.group({
        firstName: [this.user.firstName],
        lastName: [this.user.lastName],
        email: [this.user.email],
      });
    } else {
      this.userUpdateForm = this.formBuilder.group({
        firstName: [
          this.user.firstName,
          Validators.required,
          UpdateInformationValidator.hasCorrectName,
        ],
        lastName: [
          this.user.lastName,
          Validators.required,
          UpdateInformationValidator.hasCorrectName,
        ],
        address: [
          this.user.address,
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
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.userUpdateForm.valid) {
      let updatedUser = {
        ...this.userUpdateForm.value,
        id: this.user.id,
        email: this.user.email,
      } as BuyerDTO;
      this.buyerService.updateBuyer(updatedUser).subscribe({
        next: () => {
          this.snackBarService.openSnackBar(
            'Your information is updated successfully'
          );
          this.router
            .navigate(['/me'])
            .then(() => this.userUpdateForm.get('password')?.setValue(''));
        },
        error: () =>
          this.snackBarService.openSnackBar("Can't update information"),
      });
      return;
    }
    this.snackBarService.openSnackBar("Can't update information");
  }
}
