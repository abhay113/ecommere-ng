import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerComponent } from './components/seller/seller.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'seller-home', component: SellerHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
