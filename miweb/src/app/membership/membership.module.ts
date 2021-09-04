import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipListComponent } from './membership-list/membership-list.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    MembershipListComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    NzMessageModule,
    NzModalModule
  ]
})
export class MembershipModule { }
