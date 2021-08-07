import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    ProductListComponent,
    EmptyCartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NzMessageModule
  ]
})
export class CartModule { }
