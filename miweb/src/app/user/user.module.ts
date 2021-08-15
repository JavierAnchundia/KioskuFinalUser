import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { PurchaseCreditsComponent } from './purchase-credits/purchase-credits.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    ProfileComponent,
    PurchaseHistoryComponent,
    PurchaseCreditsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NzMessageModule,
    NzTableModule
  ]
})
export class UserModule { }
