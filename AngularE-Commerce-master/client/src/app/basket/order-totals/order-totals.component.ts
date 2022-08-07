import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../../shared/models/basket';
@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

    basketTotal$ : Observable<IBasketTotals>;
    basketTotal: IBasketTotals; 
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
    this.basketTotal$.subscribe(response=>{
      this.basketTotal = response;
      console.log("Subscribe Log ",this.basketTotal);
    });
  }

}
