interface IOnAmountChanged {
  (arg: { amount: number }): void;
}

class AmountSelectorController {
  // output bindings
  onAmountChanged: IOnAmountChanged;

  // internal bindings
  selectedAmount = 1;

  private minAmount = 1;
  private maxAmount = 100;

  increaseAmount() {
    let newAmount = this.selectedAmount + 1;

    if (newAmount > this.maxAmount) {
      newAmount = this.maxAmount;
    }

    this.updateSelectedAmount(newAmount);
  }

  decreaseAmount() {
    let newAmount = this.selectedAmount - 1;

    if (newAmount < this.minAmount) {
      newAmount = this.minAmount;
    }

    this.updateSelectedAmount(newAmount);
  }

  private updateSelectedAmount(newAmount: number) {
    if (newAmount !== this.selectedAmount) {
      this.selectedAmount = newAmount;

      this.onAmountChanged({amount: this.selectedAmount});
    }
  }
}

export const AmountSelectorComponent = {
  templateUrl: 'app/components/amount-selector/amount-selector.html',
  controller: AmountSelectorController,
  controllerAs: 'vm',
  bindings: {
    onAmountChanged: '&'
  }
};

