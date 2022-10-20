import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css'],
})
export class EcommerceComponent implements OnInit {
  public products = [] as any;
  productToAdd: any;
  cartItems: any;

  popup = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.getList();
    this.getCart();
  }

  getList() {
    this.service.list().subscribe((response) => {
      this.products = response;
    });
  }

  getCart() {
    this.service.cartList().subscribe((res) => {
      this.cartItems = res;

      this.cartControl();
    });
  }

  cartControl() {
    this.products.forEach((productItem: any) => {
      productItem['isInCart'] = false;

      this.cartItems.forEach((cartItem: any) => {
        if (productItem.id == cartItem.product) {
          productItem['isInCart'] = true;
        }
      });
    });
  }

  addCart(index: any, product_id: String, price: number) {
    this.productToAdd = {
      product_id: product_id,
      quantity: 1,
    };

    this.service.addCartItem(this.productToAdd).subscribe((res) => {
      this.products[index]['isInCart'] = true;
      this.popup = true;
    });
  }

  hidePopup(val: boolean) {
    this.popup = val;
  }
}
