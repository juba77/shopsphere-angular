import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO, IdOrder, OrderDTO } from 'src/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { CartService } from 'src/app/services/cart.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { OrderService } from 'src/app/services/order.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { PaymentValidator } from 'src/app/validators/payment-validator';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  amount!: number;
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private snackBarService: SnackBarService,
    private formatDateService: FormatDateService,
    private cardService: CardService,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: [
        '',
        Validators.required,
        PaymentValidator.hasCorrectCardNumber,
        Validators.minLength(16),
      ],
      expDate: [
        '',
        Validators.required,
        PaymentValidator.hasCorrectExpDate,
        Validators.minLength(5),
      ],
      code: [
        '',
        Validators.required,
        PaymentValidator.hasCorrectCode,
        Validators.minLength(3),
      ],
    });
  }

  ngOnInit(): void {
    this.amount = this.cartService.getTotalPrice();
    if (!this.amount) this.location.back();
  }

  /**
   * This function is called when the form is submitted
   */
  public onCheckout(): void {
    this.isFormSubmitted = true;
    if (!this.canPurchase()) return;
    const order = {
      articles: [
        ...this.cartService.getArticles().map((element) => element.product),
      ],
      date: this.formatDateService.formatDate('fr-FR'),
      isFinalized: true,
      client: this.authService.getUser() as BuyerDTO,
    } as OrderDTO;
    this.orderService.createOrder(order).subscribe({
      next: (idOrder: IdOrder) => {
        this.cartService.clearCart();
        this.router
          .navigate(['/orders'])
          .then(() =>
            this.snackBarService.openSnackBar('Order passed with success')
          );
      },
    });
  }

  /**
   * Checked wether the buyer can purchase his command
   */
  private canPurchase(): boolean {
    if (
      !this.paymentForm.valid ||
      (!this.cardService.hasBalanceCard(this.paymentForm) &&
        !this.cardService.hasNoBalanceCard(this.paymentForm))
    ) {
      this.router.navigate(['/payment-secure']);
      this.snackBarService.openSnackBar('Invalid payment card');
      return false;
    }
    if (this.cardService.hasNoBalanceCard(this.paymentForm)) {
      this.router.navigate(['/payment-secure']);
      this.snackBarService.openSnackBar(
        'You do not have sufficient balance on your credit card. \nPlease contact your bank for assistance.'
      );
      return false;
    }
    return true;
  }
}
