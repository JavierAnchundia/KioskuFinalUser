import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmissionComponent } from './submission/submission.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { MatDialogModule } from '@angular/material/dialog';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsComponent } from './products/products.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    AuthenticationComponent,
    NavbarComponent,
    SubmissionComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    NzBadgeModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
    MatSnackBarModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
