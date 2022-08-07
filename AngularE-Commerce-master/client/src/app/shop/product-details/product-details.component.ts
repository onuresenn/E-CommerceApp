import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/IProduct';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:  IProduct;
  quantity = 1;
  id= this.activateRoute.snapshot.paramMap.get('id');
  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private breadCrumbService: BreadcrumbService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    if(this.id != null){
      this.shopService.getProduct(+this.id).subscribe(result => { //urldeki değeri alıyyor
        this.product=result;
      this.breadCrumbService.set('@shopDetail','Shop/'+this.product.name);
        console.log(result);
      });
      }
      else{
        this.shopService.getProduct(1).subscribe(result => { //urldeki değeri alıyyor
          this.product=result;
          console.log(result);
        })
      }
    }

    addItemToBasket(){
      this.basketService.addItemToBasket(this.product,this.quantity);
    }
  
    incrementQuantity(){
      this.quantity++;
    }
    
    decrementQuantity(){
      if(this.quantity>1)
         this.quantity--;
    }
    
   
  }

