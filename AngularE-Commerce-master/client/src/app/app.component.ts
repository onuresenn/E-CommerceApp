import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/IPagination';
import { IProduct } from './shared/models/IProduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  products: IProduct[] = [];
  constructor(private http: HttpClient, private basketService: BasketService,private accountService:AccountService) { }

  ngOnInit() {
    // this.http.get('https://localhost:44318/api/Products').subscribe((response:any)=>{
    //   this.products = response.data;

    // },error=>{
    //   console.log(error);
    // });

    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('Loaded User');
      })
    }
  }


  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log("initiliaze basket")
      });
    }
  }



}
