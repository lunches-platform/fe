interface IOnQuantityChanged {
  (arg: { quantity: number }): void;
}

class QuantitySelectorController {
  // output bindings
  onQuantityChanged: IOnQuantityChanged;

  // internal bindings
  quantity = 1;

  private minQuantity = 1;
  private maxQuantity = 100;

  increaseQuantity() {
    let newQuantity = this.quantity + 1;

    if (newQuantity > this.maxQuantity) {
      newQuantity = this.maxQuantity;
    }

    this.updateSelectedQuantity(newQuantity);
  }

  decreaseQuantity() {
    let newQuantity = this.quantity - 1;

    if (newQuantity < this.minQuantity) {
      newQuantity = this.minQuantity;
    }

    this.updateSelectedQuantity(newQuantity);
  }

  private updateSelectedQuantity(newQuantity: number) {
    if (newQuantity !== this.quantity) {
      this.quantity = newQuantity;

      this.onQuantityChanged({quantity: this.quantity});
    }
  }
}

export const QuantitySelectorComponent = {
  templateUrl: 'app/components/quantity-selector/quantity-selector.html',
  controller: QuantitySelectorController,
  controllerAs: 'vm',
  bindings: {
    onQuantityChanged: '&'
  }
};

