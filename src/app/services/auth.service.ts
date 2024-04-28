import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO, LoginService, UserConnectedDTO } from 'src/api-client';
import { CartArticle } from '../models/cart-article';
import { CartService } from './cart.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private cartService: CartService,
    private snackBarService: SnackBarService
  ) {}

  public login(email: string, password: string): void {
    this.loginService.login({ email, password } as LoginDTO).subscribe({
      next: (data: UserConnectedDTO) => {
        localStorage.setItem('auth-data', JSON.stringify(data));
        localStorage.setItem('auth-cart', JSON.stringify([]));
        this.router.navigate(['/home']).then(() => window.location.reload());
      },
      error: () => {
        this.router
          .navigate(['/login'])
          .then(() =>
            this.snackBarService.openSnackBar('Invalid email or password')
          );
      },
    });
  }

  public logout(): void {
    const cart = JSON.parse(
      localStorage.getItem('auth-cart') as string
    ) as CartArticle[];
    if (cart.length > 0) {
      cart.forEach((article) => {
        for (let i = 1; i <= article.qte; i++) {
          this.cartService.removeProduct(article.product);
        }
      });
    }
    localStorage.clear();
    setTimeout(
      () =>
        this.router.navigate(['/home']).then(() => window.location.reload()),
      1000
    );
  }

  public isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('auth-data');
  }

  public getUser(): UserConnectedDTO {
    return JSON.parse(
      localStorage.getItem('auth-data') as string
    ) as UserConnectedDTO;
  }
}
