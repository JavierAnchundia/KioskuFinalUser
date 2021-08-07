import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipListComponent } from './membership-list/membership-list.component';

const routes: Routes = [
  { path:'', component: MembershipListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }
