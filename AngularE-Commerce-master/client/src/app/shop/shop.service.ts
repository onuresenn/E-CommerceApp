import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/IPagination';
import { IProduct } from '../shared/models/IProduct';
import { IType } from '../shared/models/IProductType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = "https://localhost:44318/api/";
  constructor(private httpClient: HttpClient) { }

  getproducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !=0){
      params = params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId !=0){
      params = params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }
    params = params.append('sort',shopParams.sort);
    params = params.append('pageIndex',shopParams.pageNumber);
    params = params.append('pageIndex',shopParams.pageSize.toString());
    
    return this.httpClient.get<IPagination>(this.baseUrl + 'Products',{observe :'response',params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }
  getproductByBrand(brandId: number){
    let params = new HttpParams();  
    params = params.append('brandId',brandId.toString()); 
    return this.httpClient.get<IPagination>(this.baseUrl + 'Products',{observe :'response',params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }
  getproductByType(typeId: number){
    let params = new HttpParams();  
      params = params.append('typeId',typeId.toString());  
    return this.httpClient.get<IPagination>(this.baseUrl + 'Products',{observe :'response',params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getproductBySort(sort: string){
    let params = new HttpParams();  
      params = params.append('sort',sort);  
    return this.httpClient.get<IPagination>(this.baseUrl + 'Products',{observe :'response',params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getBrands(){
    return this.httpClient.get<IBrand[]>(this.baseUrl+'Products/GetProductBrands/brands');
  }
  getTypes(){
    return this.httpClient.get<IType[]>(this.baseUrl+'Products/GetProducTypes/types');
  }

  getProduct(id : number){
      return this.httpClient.get<IProduct>(this.baseUrl + 'products/GetProduct/'+id);
  }
}
