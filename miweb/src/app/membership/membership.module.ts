import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipListComponent } from './membership-list/membership-list.component';


@NgModule({
  declarations: [
    MembershipListComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule
  ]
})
export class MembershipModule { }
