import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO, RoleEnum, UserConnectedDTO } from 'src/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: ProductDTO;
  role = RoleEnum;
  user!: UserConnectedDTO;

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initProduct();
    this.user = this.authService.getUser();
  }

  private initProduct(): void {
    const id = +this.route.snapshot.params['id'];
    this.productsService.getProduct(id).subscribe({
      next: (data: ProductDTO) => {
        this.product = data;
      },
      error: () => {
        this.snackBarService.openSnackBar('Could not get the order');
      },
    });
  }

  public isUserConnected(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  public increaseStock(): void {
    this.productsService
      .updateProduct({
        ...this.product,
        quantity: this.product.quantity + 1,
      })
      .subscribe(() => this.initProduct());
  }

  public decreaseStock(): void {
    if (!this.product.quantity) {
      this.snackBarService.openSnackBar("Product quantity can't be negative");
      return;
    }
    this.productsService
      .updateProduct({
        ...this.product,
        quantity: this.product.quantity - 1,
      })
      .subscribe(() => this.initProduct());
  }
}
