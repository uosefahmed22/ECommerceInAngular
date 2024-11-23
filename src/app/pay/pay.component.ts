import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  currantcatrId: string = "";
  isloading: boolean = false;

  addressform: FormGroup = new FormGroup({
    Address: new FormControl(null),
    city: new FormControl(null),
    PhoneNumber: new FormControl(null)
  });

  constructor(private _ActivatedRoute: ActivatedRoute, private _OrdersService: OrderService) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params) => {
      this.currantcatrId = params['id'];
    }
    );
  }

  onSubmit() {
    this.isloading = true;
    this._OrdersService.checkoutOrder(this.currantcatrId, this.addressform.value).subscribe({
      next: (res) => {
        window.location.href = res.data.paymentUrl;
        this.isloading = false;
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
      }
    });
  }

  getOrders() {
    this._OrdersService.getOrders().subscribe({
      next: (orders) => {
        console.log(orders);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}