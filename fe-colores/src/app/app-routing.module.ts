import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ColorModalComponent } from './components/modals/color-modal/color-modal.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: LayoutComponent
  },
  {
    path: 'modal-color',
    component: ColorModalComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
