import {cloneDeep, filter, find} from 'lodash';

import {ILineItem} from '../line-item/line-item.service';

export interface IOrderForm {
  items: ILineItem[];
}

export class OrderFormService {

  createOrderFormWith(items: ILineItem[]): IOrderForm {
    return {items: cloneDeep(items)};
  }

  addItemTo(_form: IOrderForm, item: ILineItem): IOrderForm {
    if (find(_form.items, ['id', item.id])) {
      return _form;
    }

    const form = cloneDeep(_form);
    form.items.push(item);

    return form;
  }

  removeItemFrom(_form: IOrderForm, item: ILineItem): IOrderForm {
    let form = cloneDeep(_form);
    form.items = filter<ILineItem>(form.items, i => i.id !== item.id);
    return form;
  }

  updateItem(lineItem: ILineItem, _form: IOrderForm): IOrderForm {
    let form = cloneDeep(_form);

    form.items = form.items.map(item => {
      return item.id === lineItem.id ? lineItem : item;
    });

    return form;
  }
}
