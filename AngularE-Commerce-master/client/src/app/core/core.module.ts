import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BasketComponent } from '../basket/basket.component';
import { BasketModule } from '../basket/basket.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: 
  [NavBarComponent, NotFoundComponent, ServerErrorComponent, TestErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    BasketModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toastr-bottom-right',
      preventDuplicates: true,
    })
  ],
  exports:[NavBarComponent,SectionHeaderComponent]
})
export class CoreModule { }
