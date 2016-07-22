import {IProduct} from '../../models/product';

export interface IMenu {
  id: number;
  date: string;
  products: IProduct[];
}
