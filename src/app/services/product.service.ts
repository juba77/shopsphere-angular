import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO, ProductsService } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productsApiService: ProductsService) {}

  /**
   * Find a product by id
   * @param id the id of the product to find
   * @returns an observable of product
   */
  public getProduct(id: number): Observable<ProductDTO> {
    return this.productsApiService.getProduct(id);
  }

  /**
   * Retrieve all products from the database
   * @returns an observable of products
   */
  public getProducts(): Observable<ProductDTO[]> {
    return this.productsApiService.getProducts();
  }

  /**
   * Update a product in the database
   * @param product the product to update
   */
  public updateProduct(product: ProductDTO): Observable<any> {
    return this.productsApiService.updateProduct(product);
  }
}
