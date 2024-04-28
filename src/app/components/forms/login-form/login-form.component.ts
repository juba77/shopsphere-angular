import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'src/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoginValidator } from 'src/app/validators/login-validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, LoginValidator.hasCorrectEmail],
      password: ['', Validators.required, LoginValidator.hasCorrectPassword],
    });
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      const formData = this.loginForm.value as LoginDTO;
      this.authService.login(formData.email, formData.password);
      return;
    }
    this.snackBarService.openSnackBar('Invalid email or password');
  }
}
