import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { CartComponent } from '../cart/cart.component';
import { ProductsComponent } from '../products/products.component';
import { SubmissionComponent } from '../submission/submission.component';
import { MembershipComponent } from '../membership/membership.component';
import { UserComponent } from '../user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthenticatedUserGuard } from '../guards/authenticated-user.guard';

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
  {
    path: 'checkout',
    component: CartComponent,
    canActivate: [AuthenticatedUserGuard],
    loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'membresia',
    component: MembershipComponent,
    loadChildren: () => import('../membership/membership.module').then(m => m.MembershipModule)
  },
  {
    path: 'usuario',
    component: UserComponent,
    canActivate: [AuthenticatedUserGuard],
    loadChildren: () => import('../user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
