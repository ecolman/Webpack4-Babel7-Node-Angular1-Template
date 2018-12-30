import angular from 'angular';

export default angular.module('verizon-pnb-ppm.components.modal.alert', [])
  .component('alertModal', {
    template:
      `<div class="modal-header">
        <h3 class="modal-title" id="modal-title">{{::$ctrl.resolve.title}}</h3>
        <i class="fa fa-times pointer" ng-show="$ctrl.resolve.showDismiss === undefined || $ctrl.resolve.showDismiss"
          ng-click="$ctrl.dismiss()"></i>
      </div>
      <div class="modal-body" id="modal-body">
        <p>{{ ::$ctrl.resolve.message }}</p>
      </div>
      <div class="modal-footer text-center">
        <button class="btn btn-primary no-arrow-icon" ng-click="$ctrl.close()">{{ ::$ctrl.resolve.buttonText }}</button>
      </div>`,
    bindings: {
      resolve: '<',
      dismiss: '&',
      close: '&'
    },
  })
  .name;
