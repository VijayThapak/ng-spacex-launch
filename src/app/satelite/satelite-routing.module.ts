import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SatelitesLayoutComponent } from './components/satelites-layout/satelites-layout.component';

const routes: Routes = [
  {
    path:'spacex',
    component: SatelitesLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SateliteRoutingModule { }
