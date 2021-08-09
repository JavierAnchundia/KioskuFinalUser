import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  private userId!: string;
  public user: any;

  constructor(
    private usuario: UsuarioService
  ) { }

  ngOnInit(): void {
    this.userId = this.usuario.getCurrentUserId();
    this.getCurrentUser();
  }

  getCurrentUser(): void{
    this.usuario.getUserInfo(this.userId)
    .then(resp => this.user = resp)
    .catch(err => console.error(err))
  }
}
