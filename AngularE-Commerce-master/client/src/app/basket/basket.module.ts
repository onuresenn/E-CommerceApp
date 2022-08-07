import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent,
    OrderTotalsComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
  ],
  exports :[OrderTotalsComponent,BasketSummaryComponent]
})
export class BasketModule { }
