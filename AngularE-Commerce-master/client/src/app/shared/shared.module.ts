import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginingHeaderComponent } from './components/pagining-header/pagining-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BasketModule } from '../basket/basket.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaginingHeaderComponent,
    PagerComponent,
    TextInputComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    BasketModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,   
    CdkStepperModule,
    RouterModule
  ],
  exports: [PaginationModule,
  PaginingHeaderComponent,
  PagerComponent,
  CarouselModule,
  ReactiveFormsModule,
  TextInputComponent,
  CdkStepperModule,
  StepperComponent,
]
})
export class SharedModule { }
