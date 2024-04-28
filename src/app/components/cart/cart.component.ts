import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/api-client';
import { CartArticle } from 'src/app/models/cart-article';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  articles!: CartArticle[];
  totalPrice!: number;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.initArticles();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  public increment(product: ProductDTO): void {
    this.cartService.addProduct(product);
    this.initArticles();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  public decrement(product: ProductDTO): void {
    this.cartService.removeProduct(product);
    this.initArticles();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  public validate(): void {
    this.router.navigate(['payment-secure']);
  }

  private initArticles(): void {
    const updatedArticles = this.cartService
      .getArticles()
      .map((p) => structuredClone(p) as CartArticle);
    this.articles = [...updatedArticles];
  }
}
