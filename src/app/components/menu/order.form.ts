import {LineItem} from '../line-item/line-item.service';
import {cloneDeep} from 'lodash';

export class OrderForm {
  items: LineItem[] = [];
}

export class OrderFormService {

  addItems(items: LineItem[], _form: OrderForm): OrderForm {
    let form = cloneDeep(_form);

    items.forEach(item => {
      form.items.push(item);
    });

    return form;
  }

  updateItem(lineItem: LineItem, _form: OrderForm): OrderForm {
    let form = cloneDeep(_form);

    form.items = form.items.map(item => {
      return item.id === lineItem.id ? lineItem : item;
    });

    return form;
  }
}
