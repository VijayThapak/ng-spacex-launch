import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [LayoutComponent, NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [LayoutComponent, NavbarComponent]
})
export class SharedModule { }
