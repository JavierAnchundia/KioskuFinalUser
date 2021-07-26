import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { ProductsComponent } from '../products/products.component';
import { SubmissionComponent } from '../submission/submission.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'postular',
    component: SubmissionComponent,
    loadChildren: () => import('../submission/submission.module').then(m => m.SubmissionModule)
  },
  {
    path: 'productos',
    component: ProductsComponent,
    loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
