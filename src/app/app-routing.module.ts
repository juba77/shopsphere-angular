import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { PaymentFormComponent } from './components/forms/payment-form/payment-form.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';
import { canActivate, canActivateOnlyForBuyer } from './services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductsComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [canActivate, canActivateOnlyForBuyer],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'me', component: UserComponent, canActivate: [canActivate] },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [canActivate, canActivateOnlyForBuyer],
  },
  {
    path: 'payment-secure',
    component: PaymentFormComponent,
    canActivate: [canActivate, canActivateOnlyForBuyer],
  },
  { path: 'products/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
