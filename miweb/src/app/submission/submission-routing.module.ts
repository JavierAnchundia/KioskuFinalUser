import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: CreateComponent
  },
  {
    path: 'items',
    component: PanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionRoutingModule { }
