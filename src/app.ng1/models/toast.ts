type IToastService = angular.material.IToastService;

export class ToastService {
  private toastPosition = 'top right';
  private toastHideDelay = 5000;

  constructor(private $mdToast: IToastService) {
    'ngInject';
  }

  show(msg: string): void {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(msg)
        .position(this.toastPosition)
        .hideDelay(this.toastHideDelay)
    );
  }
}
