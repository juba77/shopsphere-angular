import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { PaymentFormComponent } from './components/forms/payment-form/payment-form.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component';
import { UserUpdateFormComponent } from './components/forms/user-update-form/user-update-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    OrdersComponent,
    ProductComponent,
    ProductsComponent,
    UserUpdateFormComponent,
    PaymentFormComponent,
    CartComponent,
    SignupFormComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
