import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionRoutingModule } from './submission-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PanelComponent } from './panel/panel.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { EditItemComponent } from './edit-item/edit-item.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreditsModalComponent } from './credits-modal/credits-modal.component';


@NgModule({
  declarations: [
    CreateComponent,
    PanelComponent,
    EditItemComponent,
    CreditsModalComponent
  ],
  imports: [
    CommonModule,
    SubmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NzUploadModule,
    MatSnackBarModule,
    NzPopconfirmModule,
    NzAlertModule,
    NzListModule,
    NzIconModule,
    NzModalModule,
    NzPaginationModule,
    NzMessageModule,
    NzButtonModule
  ]
})
export class SubmissionModule { }
