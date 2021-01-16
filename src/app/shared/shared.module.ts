import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [LayoutComponent, NavbarComponent, FooterComponent, LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [LayoutComponent]
})
export class SharedModule { }
