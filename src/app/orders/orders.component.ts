import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private _orderService: OrderService) { }

  orders: any = [];

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this._orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }
}