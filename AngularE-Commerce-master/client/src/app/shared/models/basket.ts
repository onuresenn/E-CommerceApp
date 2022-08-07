import * as uuid from 'uuid';

export interface IBasket {
    id: string;
    items: IBasketItem[];
    clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingprice?:number;
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export class Basket implements IBasket {
  id= uuid.v4();
  items: IBasketItem[] = [];
}

export interface IBasketTotals{
  shipping: number;
  subTotal: number;
  total: number;
}
