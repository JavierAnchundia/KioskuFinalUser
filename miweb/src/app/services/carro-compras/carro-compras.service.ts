import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AUTH_SERVICIOS from 'src/app/config/urls';
import { Producto } from 'src/app/models/producto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CarroComprasService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private usuario: UsuarioService,
  ) { }

  createCarro(carro: any): Promise<any> {
    const url = AUTH_SERVICIOS.carro_compras;

    return this.http.post<any>(url, carro).toPromise();
  }

  addToCart(data: Producto): void {
    //console.log(data);
    let pList: Producto[] = JSON.parse(localStorage.getItem("cart" + this.usuario.getCurrentUserId()) || '[]');
    if (pList.length === undefined) {
      localStorage.setItem("cart" + this.usuario.getCurrentUserId(), '[]');
      pList = JSON.parse(localStorage.getItem("cart" + this.usuario.getCurrentUserId()) || '[]');

    }
    const found = pList.find((element: Producto) => element.id === data.id);

    if (found === undefined) {
      data.addedQty = 1;
      pList.push(data);
      this.startShowMessages();
    } else {
      if (found.cantidad - (found.addedQty + 1) >= 0) {
        found.addedQty += 1;
        this.startShowMessages();
      } else {
        this.createMessage('error', 'No hay más unidades disponibles.')
      }
    }

    setTimeout(() => {
      localStorage.setItem("cart" + this.usuario.getCurrentUserId(), JSON.stringify(pList));
    }, 2500);
  }

  // Removing cart from local
  removeLocalCartProduct(product: Producto) {
    const products: Producto[] = JSON.parse(localStorage.getItem("cart" + this.usuario.getCurrentUserId()) || '{}');

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("cart" + this.usuario.getCurrentUserId(), JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Producto[] {
    const products: Producto[] =
      JSON.parse(localStorage.getItem("cart" + this.usuario.getCurrentUserId()) || '{}') || [];

    return products;
  }

  updateProductAddedQty(product: Producto): void{
    const products: Producto[] = JSON.parse(localStorage.getItem("cart" + this.usuario.getCurrentUserId()) || '{}');
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products[i].addedQty = product.addedQty;
      }
    }
    localStorage.setItem("cart" + this.usuario.getCurrentUserId(), JSON.stringify(products));

  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  startShowMessages(): void {
    this.message
      .loading('Agregando producto...', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Producto agregado exitosamente.', { nzDuration: 2500 }).onClose!),
      )
      .subscribe(() => {
        console.log('¡Solicitud completada!');
      });
  }

  createPurchaseOrder(order: any): Promise<any> {
    const url = AUTH_SERVICIOS.factura;

    return this.http.post<any>(url, order).toPromise();
  }

  createCartProduct(productos: any): Promise<any> {
    const url = AUTH_SERVICIOS.carro_producto;

    return this.http.post<any>(url, productos).toPromise();
  }

  createPurchaseState(estado: any): Promise<any>{
    const url = AUTH_SERVICIOS.estado_compra;

    return this.http.post<any>(url, estado).toPromise();
  }

  updateCarro(id: string, carro: any): Promise<any> {
    const url = AUTH_SERVICIOS.carro_compras + id + '/';

    return this.http.put<any>(url, carro).toPromise();
  }

  retrieveCarroById(id: string): Promise<any> {
    const url = AUTH_SERVICIOS.carro_compras + id + '/';

    return this.http.get<any>(url).toPromise();
  }
}
