import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';


@NgModule({
  declarations: [
    ProductListComponent,
    EmptyCartComponent,
    PurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NzMessageModule
  ]
})
export class CartModule { }
