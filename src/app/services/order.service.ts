import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdOrder, OrderDTO, OrdersService } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private ordersApiService: OrdersService) {}

  /**
   * Create a new order in the database
   * @param order to save in the databse
   * @returns an obserable containing the id of the order created
   */
  public createOrder(order: OrderDTO): Observable<IdOrder> {
    return this.ordersApiService.createOrder(order);
  }

  /**
   * Retrieve all orders from the database for a buyer
   * @param buyerId the id of the buyer
   * @returns an observable of orders
   */
  public getOrders(buyerId: number): Observable<OrderDTO[]> {
    return this.ordersApiService.getOrders(buyerId);
  }
}
