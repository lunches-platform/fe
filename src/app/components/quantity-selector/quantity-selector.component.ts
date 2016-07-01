interface IOnQuantityChangedEvent {
  (arg: { quantity: number }): void;
}

export class QuantitySelectorController {
  // output bindings
  triggerQuantityChange: IOnQuantityChangedEvent;

  // internal bindings
  quantity = 1;

  private minQuantity = 1;
  private maxQuantity = 100;

  increaseQuantity() {
    let newQuantity = this.quantity + 1;

    if (newQuantity > this.maxQuantity) {
      newQuantity = this.maxQuantity;
    }

    this.updateQuantity(newQuantity);
  }

  decreaseQuantity() {
    let newQuantity = this.quantity - 1;

    if (newQuantity < this.minQuantity) {
      newQuantity = this.minQuantity;
    }

    this.updateQuantity(newQuantity);
  }

  private updateQuantity(newQuantity: number) {
    if (newQuantity !== this.quantity) {
      this.quantity = newQuantity;

      this.triggerQuantityChange({quantity: this.quantity});
    }
  }
}

export const QuantitySelectorComponent = {
  templateUrl: 'app/components/quantity-selector/quantity-selector.html',
  controller: QuantitySelectorController,
  controllerAs: 'vm',
  bindings: {
    triggerQuantityChange: '&onQuantityChanged'
  }
};

