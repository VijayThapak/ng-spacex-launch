import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SatelitesLayoutComponent } from './components/satelites-layout/satelites-layout.component';
import { SateliteRoutingModule } from './satelite-routing.module';
import { SateliteFilterComponent } from './components/satelite-filter/satelite-filter.component';
import { SateliteComponent } from './components/satelite/satelite.component';



@NgModule({
  declarations: [SatelitesLayoutComponent, SateliteFilterComponent, SateliteComponent],
  imports: [
    CommonModule,
    SateliteRoutingModule,
    HttpClientModule
  ]
})
export class SateliteModule { }
