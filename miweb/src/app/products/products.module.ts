import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    NzSelectModule,
    NzInputModule,
    NzSpinModule,
    NzAutocompleteModule,
    NzTagModule,
    NzIconModule
  ]
})
export class ProductsModule { }