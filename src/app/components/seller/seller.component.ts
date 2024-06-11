import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { signUp } from '../../data/sign-up';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss',
})
export class SellerComponent {
  signUp(data: signUp): void {
    console.log(data);
    this.sellerService.userSignUp(data).subscribe((result) => {
      console.log(result);
      alert('registration successfull !');
      if(result){
        this.router.navigate(['/seller-home'])
      }
    });
  }

  constructor(private sellerService: SellerService, private router:Router) {}
}
