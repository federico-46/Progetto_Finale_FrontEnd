import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any;
  user = localStorage.getItem('user');
  cartItemToUpdate: any;
  totale: number = 0;

  popup = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.service.cartList().subscribe((res) => {
      this.cartItems = res;
      this.calcolaTotale();
    });
  }

  updateCartMinus(cartItemId: any, quantity: number) {
    if (quantity == 1) {
      this.deleteCart(cartItemId);
    }

    if (quantity > 1) {
      this.cartItemToUpdate = { quantity: quantity - 1 };

      this.service
        .updateCartItem(cartItemId, this.cartItemToUpdate)
        .subscribe((res) => {
          this.resetTotale();
          this.getCart();
        });
    }
  }

  updateCartPlus(cartItemId: any, quantity: number) {
    this.cartItemToUpdate = { quantity: quantity + 1 };

    this.service
      .updateCartItem(cartItemId, this.cartItemToUpdate)
      .subscribe((res) => {
        this.resetTotale();
        this.getCart();
      });
  }

  deleteCart(cartItemId: any) {
    this.service.deleteCartItem(cartItemId).subscribe((res) => {
      this.resetTotale();
      this.getCart();
    });
  }

  calcolaTotale() {
    this.cartItems.forEach((item: any) => {
      this.totale =
        this.totale + parseInt(item.price, 10) * parseInt(item.quantity, 10);
    });
  }

  resetTotale() {
    this.totale = 0;
  }

  AddOrder() {
    this.cartItems.forEach((item: any) => {
      this.deleteCart(item.id);
    });

    this.popup = true;
  }

  hidePopup(val: boolean) {
    this.popup = val;
  }
}
