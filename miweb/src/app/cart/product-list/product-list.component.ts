import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Producto } from 'src/app/models/producto';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productsList: Producto[] = [];
  constructor(
    private cart: CarroComprasService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void{
    this.productsList = this.cart.getLocalCartProducts();
    console.log(this.productsList.length)
  }

  getTotalPriceItem(price: any, quantity: any): number{
    return Number(price) * Number(quantity);
  }

  getSubtotal(): number{
    let totalGlobal = 0;
    this.productsList.forEach((prod: Producto) => {
        totalGlobal += prod.addedQty * Number(prod.precio);
    })
    return totalGlobal;
  }

  getTotalProducts(): number{
    let totalProduct = 0;
    this.productsList.forEach((prod: Producto) => {
      totalProduct += prod.addedQty ;
    })
    return totalProduct;
  }

  getGlobalTotal(): number{
    let totalGlobal = 0;
    this.productsList.forEach((prod: Producto) => {
        totalGlobal += prod.addedQty * Number(prod.precio);
    })
    return totalGlobal;
  }

  removeProductUnit(product: Producto): void{
    const found: Producto = this.productsList.find((element: Producto) => element.id === product.id)!;
    if (found.addedQty > 1){
      found.addedQty -= 1;
    }

    this.cart.updateProductAddedQty(found);
  }

  addProductUnit(product: Producto): void{
    const found: Producto = this.productsList.find((element: Producto) => element.id === product.id)!;
    if (found.cantidad - (found.addedQty + 1) >= 0){
      found.addedQty += 1;
    } else {
      this.createMessage('error', 'No hay más unidades disponibles.')
    }

    this.cart.updateProductAddedQty(found);

  }

  removeProduct(product: Producto): void{
    this.cart.removeLocalCartProduct(product);
    this.loadCartItems();
    this.createMessage('success', 'Se ha removido el producto con éxito.')

  }

  openProductDetail(id: string): void{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        producto: id,
      }
    };
    this.router.navigate(['/inicio/productos/detalle'], navigationExtras);
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

}
