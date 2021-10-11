import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Producto } from 'src/app/models/producto';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productsList: Producto[] = [];
  private discountCurr: number = 0;
  private creditsCurr: number = 0;
  private loadingId = '';

  constructor(
    private cart: CarroComprasService,
    private router: Router,
    private message: NzMessageService,
    private usuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadUserInfo();
  }

  loadUserInfo(): void{
    //this.usuario.getUserInfo(this.usuario.getCurrentUserId())
    //.then(user => {
      this.discountCurr = 10;
      this.creditsCurr = 5000;
    //})
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
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount(subtotal);

    return subtotal - discount;
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

  getDiscountAmount(subtotal: number): number{
    return subtotal * (this.discountCurr / 100);
  }

  redirectPurchaseOrder(): void{
    if (this.creditsCurr < this.getGlobalTotal()){
      this.message.create('error', 'No cuenta con los créditos suficientes para continuar.')
    } else {
      this.createShoppingCart();
    }
  }

  createShoppingCart(): void{
    this.loadingId = this.message.loading('Procesando solicitud...').messageId;

    const carroCompras = new FormData();
    carroCompras.append('usuario', this.usuario.getCurrentUserId());
    carroCompras.append('subtotal', String(this.getSubtotal()));
    carroCompras.append('descuento', String(this.getDiscountAmount(this.getSubtotal())));
    carroCompras.append('totalProduct', String(this.getTotalProducts()));
    carroCompras.append('estado', 'En checkout');

    this.cart.createCarro(carroCompras)
    .then((cart: any) => {
      this.createCartProducts(cart.id);
    })
    .catch((error: any) => console.log(error))
  }

  createCartProducts(id: string): void{
    const cartProducts: any[] = [];
    this.productsList.forEach((product: Producto) => {
      cartProducts.push({
        producto: product.id,
        cantidad: product.addedQty,
        carro: id
      })
    });

    this.cart.createCartProduct(cartProducts)
    .then((cart: any) => {
      this.message.remove(this.loadingId);
      this.message.create('info', 'Redirigiendo a la página...').onClose.subscribe(()=> {
        const orderType = 'item';
        const cartId = id;
        this.router.navigate(['/inicio/checkout/facturacion'], { queryParams:  {orderType, cartId} , skipLocationChange: true});

      })
    })
    .catch((error: any) => console.log(error))

  }
}
