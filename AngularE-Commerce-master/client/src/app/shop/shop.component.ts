import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/IProduct';
import { IType } from '../shared/models/IProductType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
@ViewChild('search',{static:true}) searchTerm: ElementRef;

products?: IProduct[]=[];
brands?: IBrand[]=[];
types?: IType[]=[];
totalCount: number;
shopParams = new ShopParams();
sortOptions =  [
  {name: 'Alphabetical', value:'name'},
  {name: 'Price: Low to High', value:'priceAsc'},
  {name: 'Price: High to Low', value:'priceDesc'}
];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getproducts(this.shopParams).subscribe(response =>{
      this.products = response?.data;
      this.shopParams.pageNumber= Number(response?.pageIndex);
      this.shopParams.pageSize = Number(response?.pageSize);
      this.totalCount = Number(response?.count);

    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe(Response => {
      var firstItem = {id:0,name:'All'};
      this.brands = [firstItem,...Response]; //birleştirme yapıyor
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe(Response => {
      var firstItem = {id:0,name:'All'};
     this.types = [firstItem,...Response];
    });
  }

  onBrandSelect(brandId:number){
    console.log(brandId);
    this.shopParams.pageNumber = 1;
    this.shopParams.brandId = brandId;
    this.getProducts();
    // this.shopService.getproductByBrand(brandId).subscribe(result =>{
    //   this.products = result?.data
    // });
  }
  onTypeSelect(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
    // this.shopService.getproductByType(typeId).subscribe(result =>{
    //   this.products = result?.data
    // });
  }

  onSortSelected(sort : any){
    this.shopParams.sort = sort.target.value;
    this.getProducts();
    // this.shopService.getproductBySort(sort).subscribe(result =>{
    //   this.products = result?.data
    // });
  }

  onPageChanged($event : any){
    if(this.shopParams.pageNumber != $event){
      this.shopParams.pageNumber = $event;
      this.getProducts();
    }    
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset()
{
  this.searchTerm.nativeElement.value = undefined;
  this.shopParams = new ShopParams();
  this.getProducts();
}
}
