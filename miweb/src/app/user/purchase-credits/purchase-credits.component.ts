import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-purchase-credits',
  templateUrl: './purchase-credits.component.html',
  styleUrls: ['./purchase-credits.component.css']
})
export class PurchaseCreditsComponent implements OnInit {
  private loadingId = '';
  public tarifaCreditos = 0;
  public numeroCreditos = 0;

  constructor(
    public dialogRef: MatDialogRef<PurchaseCreditsComponent>,
    private router: Router,
    private usuario: UsuarioService,
    private message: NzMessageService,
    private cart: CarroComprasService,
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void{
    this.usuario.getUserInfo(this.usuario.getCurrentUserId())
    .then(user => {
      this.tarifaCreditos = user.membresia.valorCredito;
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  redirectPurchaseOrder(): void{
    this.createShoppingCart();

  }

  getSubtotal(): string{
    return (this.tarifaCreditos * this.numeroCreditos).toFixed(2);
  }

  createShoppingCart(): void{
    this.loadingId = this.message.loading('Procesando solicitud...').messageId;

    const carroCompras = new FormData();
    carroCompras.append('usuario', this.usuario.getCurrentUserId());
    carroCompras.append('subtotal', this.getSubtotal());
    carroCompras.append('descuento', '0');
    carroCompras.append('totalProduct', String(this.numeroCreditos));
    carroCompras.append('estado', 'En checkout');

    this.cart.createCarro(carroCompras)
    .then((cart: any) => {
      const cartId = cart.id;
      this.message.remove(this.loadingId);
      this.message.create('info', 'Redirigiendo a la página...').onClose.subscribe(()=> {
        const orderType = 'creditos';
        this.closeDialog();
        this.router.navigate(['/inicio/checkout/facturacion'], { queryParams:  {orderType, cartId} , skipLocationChange: true});

      })
    })
    .catch((error: any) => console.log(error))
  }
}
