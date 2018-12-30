import angular from 'angular';

export class Controller {
  constructor($q, ModalService) {
    'ngInject';

    this.Modal = ModalService;
    this.$q = $q;
  }

  $onInit() {
    this.properties = {};
    this.deferred = null;
    this.instance = this.Modal.registerOverlay(this.id, properties => {
      this.deferred = this.$q.defer();

      Object.assign(this.properties, {}, properties);
      this.isShowingConfirmation = true;

      return this.deferred.promise;
    });
  }

  $onDestroy() {
    this.Modal.unregisterOverlay(this.id);
  }

  confirm() {
    this.isShowingConfirmation = false;
    this.deferred.resolve();
  }

  dismiss() {
    this.isShowingConfirmation = false;
    this.deferred.reject();
  }
}

export default angular.module('verizon-pnb-ppm.components.modal.confirmation-overlay', [])
  .component('confirmationOverlayModal', {
    template:
      `<div class="confirmation-overlay" ng-if="$ctrl.isShowingConfirmation">
        <div class="confirmation-overlay__backdrop"></div>
        <div class="confirmation-overlay__content">
          <label ng-bind-html="$ctrl.properties.text"></label>
          <label class="secondary" ng-bind-html="$ctrl.properties.secondaryText"></label>
          <div class="confirmation-overlay__content-buttons">
            <button class="btn btn-primary no-arrow-icon" ng-click="$ctrl.confirm()">Yes, continue.</button>
            <button class="btn btn-secondary no-arrow-icon" ng-click="$ctrl.dismiss()">No, go back.</button>
          </div>
        </div>
      </div>`,
    bindings: {
      id: '@'
    },
    controller: Controller
  })
  .name;
