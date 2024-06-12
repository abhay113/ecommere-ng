import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SellerComponent } from './components/seller/seller.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerEditProductComponent } from './components/seller-edit-product/seller-edit-product.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SellerComponent, NavComponent, SellerHomeComponent, SellerAddProductComponent, SellerEditProductComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
