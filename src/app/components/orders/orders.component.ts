import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: OrderDTO[] = [];

  constructor(
    private ordersService: OrderService,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initOrdersList();
  }

  /* Init the orders list by fetching orders from the database */
  private initOrdersList(): void {
    const id = this.authService.getUser().id;
    this.ordersService.getOrders(id as number).subscribe({
      next: (data: OrderDTO[]) => {
        this.ordersList = data ? [...data] : [];
      },
      error: () => {
        this.snackBarService.openSnackBar(
          'Could not fetch orders from database'
        );
      },
    });
  }
}
