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


@NgModule({
  declarations: [
    CreateComponent,
    PanelComponent,
    EditItemComponent
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
    NzIconModule
  ]
})
export class SubmissionModule { }
