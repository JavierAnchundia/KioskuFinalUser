import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  private userId!: string;
  public user: any;
  public productsList: Producto[] = [];
  private discountCurr: number = 0;
  public deliveryValue: number = 0;
  public orderType = '';
  public cartId = '';
  public loadingId = '';
  public carro!: any[];
  public loaded = false;
  @ViewChild('paypalRef', { static: true}) private paypalRef!: ElementRef;
  paidFor: boolean = false; //Payment Successful Message handling

  constructor(
    private usuario: UsuarioService,
    private cart: CarroComprasService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private item: ItemService,
  ) {

  }

  ngOnInit(): void {
    this.orderType = this.route.snapshot.queryParams.orderType;
    this.cartId = this.route.snapshot.queryParams.cartId;
    this.userId = this.usuario.getCurrentUserId();
    this.getCurrentUser();
    if (this.orderType === 'item'){
      this.loadCartItems();
      this.getCarro();
    } else if(this.orderType === 'creditos'){
      this.getCarro();
    }
  }

  renderPaypalBtn() : void{
    window.paypal.Buttons(
      {
        style:{
          layout: 'horizontal',
          shape: 'rect',
        },
        createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; currency_code: string; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: String(this.getGlobalTotal()),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order)
          this.createItemPurchaseOrder();

          },
          onError: (err: any) => {
          console.log(err)
          }

      }).render(this.paypalRef.nativeElement);
  }

  getCarro(): void{
    this.cart.retrieveCarroById(this.cartId)
    .then((cartResponse: any) => {
      this.carro = cartResponse;
      if (this.orderType !== 'item'){
        this.renderPaypalBtn();
      }
      this.loaded = true;
    })
  }

  getCurrentUser(): void{
    this.usuario.getUserInfo(this.userId)
    .then(resp => {
      this.user = resp;
      this.discountCurr = this.user.membresia.pct_dscto;

    })
    .catch(err => console.error(err))
  }

  loadCartItems(): void{
    this.productsList = this.cart.getLocalCartProducts();
    this.loaded = true;

  }
  getTotalPriceItem(price: any, quantity: any): number{
    return Number(price) * Number(quantity);
  }

  getSubtotal(): number{
    let totalGlobal = 0;
    if (this.orderType === 'item'){
      this.productsList.forEach((prod: Producto) => {
        totalGlobal += prod.addedQty * Number(prod.precio);
    })
    } else if(this.orderType === 'creditos'){
      totalGlobal = this.carro['subtotal'];
    }

    return totalGlobal;
  }

  getTotalProducts(): number{
    let totalProduct = 0;
    if (this.orderType === 'item'){
      this.productsList.forEach((prod: Producto) => {
        totalProduct += prod.addedQty ;
      })
    } else if(this.orderType === 'creditos'){
      totalProduct = this.carro['totalProduct'];
    }
    return totalProduct;
  }

  getGlobalTotal(): number{
    const subtotal = this.getSubtotal();
    let discount = 0;
    if (this.orderType === 'item'){
      this.deliveryValue = this.carro['costoEntrega'];
      console.log(this.deliveryValue);
      discount = this.getDiscountAmount(subtotal);
    }
    return subtotal + Number(this.deliveryValue) - discount;
  }

  getDiscountAmount(subtotal: number): number{
    return subtotal * (this.discountCurr / 100);
  }

  confirmPurchaseOrder(): void{
    this.loadingId = this.message.loading('Procesando solicitud...').messageId;
    if (this.orderType === 'item'){
      this.createItemPurchaseOrder();
    } else if (this.orderType === 'creditos'){
      this.createItemPurchaseOrder();
    }
  }

  createItemPurchaseOrder(): void{
    const estado = new FormData();
    if (this.orderType === 'item'){
      estado.append('estado', 'Por entregar');
    } else if (this.orderType === 'creditos'){
      estado.append('estado', 'Entregado');
    }

    this.cart.createPurchaseState(estado)
    .then((resp: any) => {
      this.createPurchaceInvoice(resp.id);
    })
    .catch((error: any) => {
      console.log(error);
    })
  }

  createPurchaceInvoice(id: string): void{
    const invoice = new FormData();
    invoice.append('metodoPago', this.orderType === 'item' ? '1' : '2');
    invoice.append('total', String(this.getGlobalTotal()));
    invoice.append('costoEntrega', '0');
    invoice.append('estado', id);
    invoice.append('carro', this.cartId);
    invoice.append('detalle', this.orderType);
    this.cart.createPurchaseOrder(invoice)
    .then((resp: any) => {
      if (this.orderType === 'item'){
        this.cart.updateCarro(this.cartId, {estado: 'Ordenado'});
        this.updateCredits();
        localStorage.removeItem("cart" + this.usuario.getCurrentUserId());
      } else if (this.orderType === 'creditos'){
        this.updateCredits();
      }

    })
    .catch((error: any) => {
      console.log(error)
    })
  }

  updateCredits(value?: any): void {

    const updatedSaldo = new FormData();
    if (this.orderType === 'item'){
      updatedSaldo.append('saldo', (this.user.saldo - this.getGlobalTotal()).toFixed(2));
    } else {
      updatedSaldo.append('saldo', String((Number(this.user.saldo) + Number(this.carro['totalProduct'])).toFixed(2)));
    }

    this.usuario.updateUser(this.usuario.getCurrentUserId(), updatedSaldo)
      .then((updated: any) => {
        this.message.remove(this.loadingId);
        this.message.create('success', 'Compra realizada exitosamente...').onClose.subscribe(()=> {
          this.router.navigate(['/inicio/usuario/historial']);
        })
      })
      .catch((error: any) => {
        console.log(error);
        this.message.error('No se pudo completar la solicitud. Intente nuevamente.', { nzDuration: 1000 });

      })
  }
}
