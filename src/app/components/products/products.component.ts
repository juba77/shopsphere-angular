import { Component, OnInit } from '@angular/core';
import { ProductDTO, RoleEnum, UserConnectedDTO } from 'src/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList: ProductDTO[] = [];
  user!: UserConnectedDTO;
  role = RoleEnum;

  constructor(
    private productsService: ProductService,
    private cartService: CartService,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initProductsList();
    this.user = this.authService.getUser();
  }

  /* Init the products list by fetching products from the database */
  private initProductsList(): void {
    this.productsService.getProducts().subscribe({
      next: (data: ProductDTO[]) => {
        this.productsList = data ? [...data] : [];
      },
      error: () => {
        this.snackBarService.openSnackBar(
          'Could not fetch products from database'
        );
      },
    });
  }

  public isUserConnected(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  public addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    const updatedProductsList = this.productsList.map((p) =>
      p.id === product.id
        ? { ...p, quantity: p.quantity > 0 ? p.quantity - 1 : p.quantity }
        : p
    );
    this.productsList = [...updatedProductsList];
  }
}
