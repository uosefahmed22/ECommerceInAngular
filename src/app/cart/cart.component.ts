import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private _CartService: CartService) {
    localStorage.setItem("currentPage", "/cart");
  }
  cartItems: any[] = [];
  numOfCartItems: number = 0;
  totalCartPrice: number = 0;
  cardId: string = "";


  ngOnInit(): void {
    this.refreshCartData();
    localStorage.setItem("currentPage", "/cart");
  }

  removeItembtn(productId: number) {
    this._CartService.removeItemfromCart(productId).subscribe({
      next: () => {
        const itemIndex = this.cartItems.findIndex((item: any) => item.productId === productId);
        if (itemIndex > -1) {
          this.cartItems.splice(itemIndex, 1);
          this.refreshCartData();
        }
        console.log("Item removed from cart");
      },
      error: (err) => {
        this.errorHandler(err, "removing item from cart");
      },
    });
  }
  
  refreshCartData(): void {
    this._CartService.getCartItems().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.cartItems = res.data || [];
        this.numOfCartItems = res.numOfCartItems || 0;
        this.cardId = this.cartItems.length > 0 ? this.cartItems[0].cartId : "";
        this.totalCartPrice = this.cartItems.reduce((total, item) => total + item.totalPriceOfItem, 0);
      }
    });
  }

  errorHandler(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
    alert(`Failed to ${action}. Please try again later.`);
  }

  updateItemsCart(whichbtn: string, productId: number, quantity: number) {
    const itemIndex = this.cartItems.findIndex((item: any) => item.productId === productId);
    if (itemIndex === -1) return;

    const itemToUpdate = this.cartItems[itemIndex];
    const previousQuantity = itemToUpdate.quantity;

    if (whichbtn === "plus") {
      itemToUpdate.quantity += 1;
    } else if (whichbtn === "minus") {
      if (itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      } else {
        this.removeItembtn(productId);
        return;
      }
    } else {
      return;
    }

    this._CartService.updateCartItem(productId, itemToUpdate.quantity).subscribe({
      next: (response: any) => {
        if (response?.data?.totalCartPrice !== undefined) {
          this.refreshCartData();
        } else {
          this.refreshCartData();
        }
      },
      error: (err) => {
        this.errorHandler(err, "updating cart item");
        itemToUpdate.quantity = previousQuantity;
      },
    });
  }
}